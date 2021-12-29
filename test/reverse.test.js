import test from 'tape'
import { learn, convert, reverse } from '../src/index.js'
import future from './data/future-simple.js'

test('future tense:', function (t) {
  let model = learn(future)
  let rev = reverse(model)
  // test them all
  future.forEach((a) => {
    let created = convert(a[1], rev)
    t.equal(created, a[0], `[future] '${a[0]}' -> '${created}'`)
  })
  t.end()
})

test('french-nous:', function (t) {
  let model = learn(future)
  let rev = reverse(model)
  // test them all
  future.forEach((a) => {
    let created = convert(a[1], rev)
    t.equal(created, a[0], `[nous] '${a[0]}' -> '${created}'`)
  })
  t.end()
})
