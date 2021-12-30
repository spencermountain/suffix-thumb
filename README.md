<div align="center">
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
  
   <hr/>
  
</div>

`suffix-thumb` tries to discover the way two sets of words map to one another, according to changes in their suffix.

It was built to learn rules about verb conjugations, but in a way, it is just a generic compression algorithm.

The assumption is that a word's _suffix_ is the most changeable part of a word.

![carbon(1)](https://user-images.githubusercontent.com/399657/79898840-e7e66780-83d9-11ea-9ff3-099bf39cf892.png)

```js
import { learn, convert } from 'suffix-thumb'

let pairs = [
  ['walk', 'walked'],
  ['talk', 'talked'],
  ['go', 'went'],
]
let model = learn(pairs)
/* {
  rules: { k: [ [ 'alk', 'alked' ] ] },
  exceptions: { go: 'went' },
}*/

let pairs = [
  ['aail', 'aael'],
  ['bbil', 'bbel'],
  ['cil', 'cel'],
  ['snafoo', 'snabar'],
  ['poofoo', 'poobar'],
]
let model = learn(pairs)
/* {
  rules: { o: [ [ 'foo', 'bar' ] ], l: [ [ 'il', 'el' ] ] },
  exceptions: {},
}
*/

let out = convert('snafoo', model)
// 'snabar'
```

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
learn(pairs, {inverse: false})
```
you can expect the model to be 5% smaller or so - not much.

### Compress
by default, the model is small, but remains human-readable (and human-editable).
We can compress it further, turning it into a snowball inscrutible characters:

```js
import { learn, compress, uncompress, convert } from 'suffix-thumb'

let pairs = [
  ['walk', 'walked'],
  ['talk', 'talked'],
  ['go', 'went'],
]
let model = learn(pairs)
// shrink it
model = compress(shrink)
// {rules:'LSKs3H2-LNL.S3DH'}
// pop it back
model = uncompress(model)
let out = convert('walk', model)
// 'walked'

```
The models must be uncompressed before they are used, or reversed.


### Validation
sometimes you can accidentally send in an impossible set of transformations. This library quietly ignores duplicates, by default.
You can use `{verbose:true}` to log warnings about this, or validate your input manually:
```js
import { validate } from 'suffix-thumb'
let pairs = [
  ['left', 'right'],
  ['left', 'right-two'],
  ['ok', 'right'],
]
pairs = validate(pairs) //remove dupes (on both sides)
```

If you are just doing one-way transformation, and not reverse, you may want to allow duplicates on the right side:
```js
let pairs = [
  ['left', 'right'],
  ['ok', 'right'],
]
let model = learn(pairs, {inverse: false})
let out = convert('ok', model)
// 'right'
```

## How it works

For each word-pair, it generates all **n-suffixes** of the left-side, and **n-suffixes** of the right-side.

any good correlations between the two suffix pairs begins to pop out. Exceptions to these rules are remembered. It then exhaustively reduces any redundancies in these rules.

There are some compromises, magic-numbers, and opinionated decisions - in-order to allow productive, but imperfect rules.

* The library is meant optimize for file-size of the model
* compression is slow, uncompression is fast
* it should always return a perfect result

The library drops case-information - and numbers and some characters[1](https://github.com/spencermountain/efrt) will not compress properly.

There may be wordlists with few helpful patterns. Conjugation datasets in English and French tend to get ~85% filesize compression.


### See also
* [efrt](https://github.com/spencermountain/efrt) - trie-based JSON compression

MIT
