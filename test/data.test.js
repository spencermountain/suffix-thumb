import test from 'tape'
import { find, convert } from '../src/index.js'
import future from './data/future-simple.js'

test('future tense:', function (t) {
  let model = find(future)
  // test them all
  future.forEach((a) => {
    let created = convert(a[0], model)
    t.equal(created, a[1], `[future] '${a[0]}' -> '${created}'`)
  })
  t.end()
})

test('french-nous:', function (t) {
  let model = find(future)
  // test them all
  future.forEach((a) => {
    let created = convert(a[0], model)
    t.equal(created, a[1], `[nous] '${a[0]}' -> '${created}'`)
  })
  t.end()
})
