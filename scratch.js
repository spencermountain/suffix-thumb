import { find, convert } from './src/index.js'
import pairs from './test/data/future-simple.js'

let model = find(pairs)
// console.log(model)
console.log(model.rules.length, 'rules')
console.log(Object.keys(model.exceptions).length, 'exceptions')

console.log('errors:')
pairs.forEach((a) => {
  let created = convert(a[0], model)
  if (created !== a[1]) {
    console.log(a, created)
  }
})
console.log('   -done')
