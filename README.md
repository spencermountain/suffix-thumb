<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>find an optimal set transormations between sets of words</div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/suffix-thumb">
    <img src="https://img.shields.io/npm/v/suffix-thumb.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/suffix-thumb/builds/suffix-thumb.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/ngrams/builds/suffix-thumb.min.js" />
  </a>
  
   <hr/>
  
   <div align="center">
    <code>npm install suffix-thumb</code>
  </div>
</div>

**suffix-thumb** tries to discover the way two sets of words map to one another, according to changes in their suffix.

It was built to learn rules about verb conjugations, but in a way, it is just a generic compression algorithm.
The assumption is that a word suffix is the most changeable part of a word.

```js
const thumb = require('./src')

const words = [
  ['aail', 'aael'],
  ['bbil', 'bbel'],
  ['cil', 'cel'],
  ['snafoo', 'snabar'],
  ['poofoo', 'poobar'],
]
let res = thumb(words)
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
```

### How it works

For each word-pair, it generates all n-suffixes of the left, and n-suffixes of the right.

if the dataset is large enough, any pattern between the two sets of words will pop out.

it takes the patterns that emerge, and reduces any redundancies in this list.

it then runs the patters on the dataset, to get a score, and any exceptions.

There may be wordlists with no helpful patterns.

### See also

- [nlp-thumb](https://github.com/nlp-compromise/thumb) - classify words by suffix

MIT
