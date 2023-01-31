import { learn, test, reverse, convert, compress } from './src/index.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-words.js'
import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/future-simple.js'
let opts = {
  threshold: 0.8,
  reverse: true
}


let model = learn(pairs)
console.log(model)
// console.log(reverse(model))
// console.log('----')
// console.log(model)
// console.log(reverse(model))
test(pairs, model)