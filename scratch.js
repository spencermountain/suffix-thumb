import { find, convert, compress } from './src/index.js'
// import pairs from './test/data/fr-nous.js'

const pairs = [
  ['walk', 'walking'],
  ['wait', 'waiting'],
  ['sing', 'singing'],
]

let model = find(pairs)
// console.log(model)
// model = compress(model)
// console.log(convert('vouloir', model))
console.log('errors:')
pairs.forEach((a) => {
  let created = convert(a[0], model)
  if (created !== a[1]) {
    console.log('err', a, created)
  }
})
console.log('   -done')
