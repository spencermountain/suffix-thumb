const test = require('tape')
const { find, convert } = require('../src')
const future = require('./data/future-simple.js')

test('future tense:', function (t) {
  let model = find(future)

  // test them all
  future.forEach((a) => {
    let created = convert(a[0], model)
    t.equal(created, a[1], `'${a[0]}' -> '${created}'`)
  })

  t.end()
})
