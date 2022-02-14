import { convert, learn, compress, uncompress, reverse, validate, debug, test, classify } from './src/index.js'
// import learn from './smaller/index.js'

import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBD.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBZ.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBG.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/NNS.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'

// let pairs = [

//   ["recapping", "recap", 2],
//   ["beeping", "beep", 2],
//   ["coiling", "coil", 2],
// ]

let model = learn(pairs)
console.log(model.rules)
console.log(classify('gleaning', model))
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
// console.dir(model, { depth: 5 })
// console.log(classify('disembark', model))
// console.log(nulls, ' nulls  of ', pairs.length)
// console.log(errors, 'out of ', pairs.length)
// console.dir(model, { depth: 5 })
// console.log(model.rules.length, 'rules')

// console.log(convert('beeping', model))
// let rev = reverse(model)
// console.log(convert('beep', rev))
// test(pairs)
// console.log(JSON.stringify(model, null, 2))