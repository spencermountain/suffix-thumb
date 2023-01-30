import { again, test } from './src/index.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-words.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'
import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/future-simple.js'

let model = again(pairs)
console.log(model)
test(pairs, model)