import { again, test } from './src/index.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-words.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/future-simple.js'

let pairs = [
  ['ocool', 'ocool'],
  ['acool', 'agood'],
  ['bcool', 'bgood'],
  ['ccool', 'cgood'],
  ['dcool', 'dgood'],
  ['ecool', 'egood'],
  ['gcool', 'ggood'],
]

let model = again(pairs)
console.log(model)
test(pairs, model)