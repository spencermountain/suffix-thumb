import { learn, test, reverse, convert } from './src/index.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-words.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/future-simple.js'

let pairs = [
  ['devoir', 'devrons'],
  ['émouvoir', 'émouvrons'],
  ['entrevoir', 'entreverrons'],
  ['mouvoir', 'mouvrons'],
  ['pourvoir', 'pourvoirons'],
  ['pouvoir', 'pourrons'],
  ['préconcevoir', 'préconcevrons'],
  ['prévoir', 'prévoirons'],
  ['redevoir', 'redevrons'],
  ['revoir', 'reverrons'],
]

let model = learn(pairs)
console.log(model)
// console.log(reverse(model))
// console.log('----')
// console.log(model)
// console.log(reverse(model))
test(pairs, model)