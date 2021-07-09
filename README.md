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
import { find, convert } from 'suffix-thumb'

const pairs = [
  ['walk', 'walked'],
  ['talk', 'talked'],
  ['go', 'went'],
]
let model = find(pairs)
/* { rules: [ ['alk', 'alked'] ],
    exceptions: {go:'went'},
    coverage: 0.66,
}*/

const pairs = [
  ['aail', 'aael'],
  ['bbil', 'bbel'],
  ['cil', 'cel'],
  ['snafoo', 'snabar'],
  ['poofoo', 'poobar'],
]
let model = find(pairs)
/*
  { 
    rules: [ 
      [ 'foo', 'bar', 2 ],
      [ 'il', 'el', 3 ]
    ],
    exceptions: {},
    percent: 100 
  }
*/

let out = convert('snafoo', model)
// 'snabar'
```

## How it works

For each word-pair, it generates all **n-suffixes** of the left, and **n-suffixes** of the right.

any pattern between the two sets of words begins to pop out.

it reduces any redundancies in this list.

it then runs the patters on the dataset, to get a score, and any exceptions.

There may be wordlists with no helpful patterns.

Ideally, you should be able to take a list of word-pairs, create a model for them, and then delete the 2nd half of the word pairs.

MIT
