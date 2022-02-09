// import { convert, compress, uncompress, reverse, validate, debug, test } from './src/index.js'
// import learn from './smaller/index.js'
import learn from './src/wide/index.js'

// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBD.js'
import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBG.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/NNS.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'

// let pairs = [
//   ['trouble', 'troubled'],
//   ['walk', 'walked'],
//   ['smoke', 'smoked'],
//   ['laugh', 'laughed'],
//   ['snake', 'snaked'],
//   ['flub', 'flubi'],
// ]

let model = learn(pairs)
console.dir(model, { depth: 5 })
// console.log(JSON.stringify(model, null, 2))