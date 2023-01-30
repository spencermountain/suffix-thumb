import { again, test, reverse } from './src/index.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-words.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/future-simple.js'

let pairs = [
  ['croirai', 'croire'],
  ['cuirai', 'cuire'],
  ['croulerai', 'crouler'],
  ['cuisinerai', 'cuisiner'],
  ['déblayerai', 'déblayer'],
  ['débouillirai', 'débouillir'],
]

let model = again(pairs)
// console.log('----')
// console.log(model)
// console.log(reverse(model))
test(pairs, model)