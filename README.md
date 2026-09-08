<div align="center">
  <!-- spacer -->
  <img height="15px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>


  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>find the optimal transormations between sets of words</div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/suffix-thumb">
    <img src="https://img.shields.io/npm/v/suffix-thumb.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/suffix-thumb/builds/suffix-thumb.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/suffix-thumb/master/builds/suffix-thumb.min.js" />
  </a>

   <div align="center">
    <code>npm install suffix-thumb</code>
  </div>
  
  <!-- spacer -->
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

  
</div>

discover the minimal rules for mapping two sets of words to one another, according to changes in their suffix.

It was built for learning rules about verb conjugations, but in a way, it is just a generic compression algorithm.

The assumption is that a word's _suffix_ is the most-often changed part of a word.

<!-- ![carbon(1)](https://user-images.githubusercontent.com/399657/79898840-e7e66780-83d9-11ea-9ff3-099bf39cf892.png) -->

![preview](https://user-images.githubusercontent.com/399657/147783157-f8bdf781-0925-4af3-9fdc-beb84073803e.png)


<!-- spacer -->
<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### Learn → Convert

```js
import { learn, convert } from 'suffix-thumb'

let pairs = [
  ['walk', 'walked'],
  ['talk', 'talked'],
  ['go', 'went'],
]
let model = learn(pairs)
/* {
  fwd: {},
  both: { '': 'ed', go: 'went' },
  rev: {},
  ex: {},
}*/

let out = convert('walk', model)
// 'walked'
```

the model has four parts:
* `fwd` - suffix rules that only work left→right
* `both` - suffix rules that also work right→left
* `rev` - suffix rules that only work right→left
* `ex` - whole-word exceptions

when converting a word, exceptions are checked first, then the **longest matching suffix** wins.
A rule may match the whole word, and the empty-suffix rule `''` is a fallback that simply appends.

you can pass-in options:
```js
let opts={
  min: 0, // a rule must serve at least this many pairs (otherwise, use an exception)
  reverse: true, // also learn the backward transformation
  verbose: false, // warn about skipped pairs
}
let model = learn(pairs, opts)
```
<!-- spacer -->
<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### Reverse
the model also works transforming the words the other way:
```js
import { learn, reverse, convert } from 'suffix-thumb'

let pairs = [
  ['walk', 'walked'],
  ['talk', 'talked'],
  ['go', 'went'],
]
let model = learn(pairs)
let rev = reverse(model)
let out = convert('walked', rev)
// 'walk'
```
by default, the model ensures all two-way transformation - if you only require 1-way, you can do:
```js
learn(pairs, {reverse: false})
```
you can expect the model to be 5% smaller or so - not much.

<!-- spacer -->
<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### Compress
by default, the model is small, but remains human-readable (and human-editable).
We can pack it further, into one string:

```js
import { learn, compress, uncompress, convert } from 'suffix-thumb'

let pairs = [
  ['walk', 'walked'],
  ['talk', 'talked'],
  ['go', 'went'],
]
let model = learn(pairs)
// shrink it
let str = compress(model)
// '~0ed:|2went:go~~'
// pop it back
model = uncompress(str)
let out = convert('walk', model)
// 'walked'
```
The models must be uncompressed before they are used, or reversed.

The packed string is still legible, with some squinting:
* the four sections (`fwd`, `both`, `rev`, `ex`) are separated by `~`
* each section is a list of `value:keys` groups, separated by `|`
* a value is *drop this many characters, then add this*  - so `1as` turns `chico` into `chicas`
* the keys are a suffix-trie: `ador{lt,nz,ep}` is `ltador`, `nzador` and `epador`. An empty entry, like `ero{,nton}`, means `ero` is a key too.

```js
'4èlerons:eler{en,c,t{man,r},g,od,i,k}|4èterons:eter{h,qu{c,écli,a{r,p}}}'
```
This means the characters `~ | : , { }` and digits are reserved - pairs containing them are skipped.

<!-- spacer -->
<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### Duplicates
a left-side word can only map to one thing, so repeated left-side words are quietly ignored.

Repeated right-side words are fine - `'poner'` and `'ponerse'` can both become `'puesto'`.
When reversing, the *first* pair wins: `'puesto'` → `'poner'`.

```js
import { validate } from 'suffix-thumb'
let pairs = [
  ['left', 'right'],
  ['left', 'right-two'],
  ['ok', 'right'],
]
pairs = validate(pairs) // remove dupes (on both sides), and unencodable pairs
pairs = validate(pairs, { reverse: false }) // keep right-side dupes, for a one-way model
```

<!-- spacer -->
<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

## How it works

The left-side words are arranged into a suffix-trie.
Every pair implies a family of possible rules - `'walk'→'walked'` could be `''→'ed'`, `'k'→'ked'`, `'lk'→'lked'`, and so on - and each of those rules lives at one node in the trie.

Walking the trie bottom-up, each node either inherits the rule of its nearest ancestor, or places its own rule, which then governs every word beneath it - until a deeper node overrides it, or a word that no rule fits becomes an exception.
Because the lookup is *longest-suffix-wins*, these choices are independent enough that the byte-cheapest combination can be found exactly, in about a second for 15,000 pairs.

The backward direction is then learned the same way, with a discount for any rule that is simply the mirror of a forward rule - those are stored once, in `both`.

* The library is meant optimize for file-size of the model
* it always returns a perfect result on its training data - both ways
* it may be less-clever about words it hasn't seen.

The library drops case-information - and numbers and some characters[1](https://github.com/spencermountain/efrt) will not compress properly.

Conjugation datasets in French, Spanish and Italian tend to get ~98% filesize compression.

<!-- spacer -->
<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>


### See also
* [efrt](https://github.com/spencermountain/efrt) - trie-based prefix compression for JSON
  
<!-- spacer -->
<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>


MIT
