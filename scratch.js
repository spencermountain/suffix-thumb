const { find, convert } = require('./src/index.js')
const pairs = require('./test/data/future-simple')

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
