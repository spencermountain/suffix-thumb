import { find, convert, compress } from './src/index.js'
// import pairs from './test/data/fr-nous.js'

const pairs = [
  ['aail', 'aael'],
  ['bbil', 'bbel'],
  ['cil', 'cel'],
  ['snafoo', 'snabar'],
  ['poofoo', 'poobar'],
]
let model = find(pairs)
// console.dir(model)
console.dir(model, { depth: 5 })
// model = compress(model)
// console.log(convert('vouloir', model))
// console.log('errors:')
// pairs.forEach((a) => {
//   let created = convert(a[0], model)
//   if (created !== a[1]) {
//     console.log('err', a, created)
//   }
// })
// console.log('   -done')
