import { learn, test, reverse, convert, compress } from './src/index.js'
import summarize from './scripts/summarize.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/tests/data/fr-words.js' //0.3kb
import pairs from '/Users/spencer/mountain/suffix-thumb/tests/data/future-simple.js' //1.6kb
// import pairs from '/Users/spencer/mountain/suffix-thumb/tests/data/fr-nous.js' //4.5kb


let opts = {
  // threshold: 70,
  // min: 2,
  // reverse: true
}

let model = learn(pairs, opts)
// model.ex = {}
console.log(compress(model))
// console.log(reverse(model))
// console.log(model)
summarize(model)
test(pairs, model)