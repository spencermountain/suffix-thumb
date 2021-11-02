import { find, convert, compress } from './src/index.js'
// import pairs from './test/data/fr-nous.js'

const pairs = [
  ['managed', 'manage'],
  ['lodged', 'lodge'],
  ['changed', 'change'],
  ['encouraged', 'encourage'],
  ['charged', 'charge'],
  ['arranged', 'arrange'],
  ['urged', 'urge'],
  ['packaged', 'package'],
  ['engaged', 'engage'],
  ['barraged', 'barrage'],
  ['tinged', 'ting'],
  ['emerged', 'emerge'],
  ['aged', 'age'],
  ['plunged', 'plunge'],
  ['challenged', 'challenge'],
  ['discharged', 'discharge'],
  ['well-managed', 'well-manage'],
  ['surged', 'surge'],
  ['edged', 'edge'],
  ['envisaged', 'envisage'],
  ['averaged', 'average'],
  ['enlarged', 'enlarge'],

  ['bagged', 'bag'],
  ['pegged', 'peg'],
  ['dragged', 'drag'],
  ['fragged', 'ofofofj'],
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
