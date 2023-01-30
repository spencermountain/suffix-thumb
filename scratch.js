import { learn, test, reverse, convert } from './src/index.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-words.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/future-simple.js'

let pairs = [
  ['acool', 'agood'],
  ['bcool', 'bgood'],
  ['ccool', 'cgood'],
  ['dcool', 'dgood'],
  ['ecool', 'egood'],
  ['gcool', 'ggood'],
  ['ooocool', 'ooocool'],//unchanged
]

let model = learn(pairs)
console.log(model)
// console.log('----')
// console.log(model)
// console.log(reverse(model))
test(pairs, model)