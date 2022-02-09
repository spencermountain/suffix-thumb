import { convert, compress, uncompress, reverse, validate, debug, test } from './src/index.js'
// import learn from './smaller/index.js'
import learn from './src/wide/index.js'

// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBD.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBZ.js'
import pairs from '/Users/spencer/mountain/minimum-model/pairs/NNS.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'

// let pairs = [

//   //   ['trouble', 'troubled'],
//   //   ['walk', 'walked'],
//   //   ['smoke', 'smoked'],
//   //   ['laugh', 'laughed'],
//   //   ['snake', 'snaked'],
//   //   ['flub', 'flubi'],
//   ["operating", "operate", 6540],
//   ["supporting", "support", 4833],
//   ["exceeding", "exceed", 4320],
//   ["growing", "grow", 4117],
// ]


// let model = learn(pairs)
// let errors = 0
// pairs.forEach(a => {
//   let [left, right] = a
//   let out = convert(left, model)
//   if (out === right) {
//     console.log('\x1b[32m✓\x1b[0m')
//   } else {
//     console.log('\x1b[31m✗\x1b[0m')
//     console.log(left, out)
//     errors += 1
//   }
// })
// console.log(errors, 'out of ', pairs.length)
// console.dir(model, { depth: 5 })
// console.log(convert('despised', model))
test(pairs)
// console.log(JSON.stringify(model, null, 2))