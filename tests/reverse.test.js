import test from 'tape'
import { learn, convert, reverse, validate } from './lib/_lib.js'
import future from './data/future-simple.js'
import nous from './data/fr-nous.js'

test('future tense:', function (t) {
  const pairs = validate(future)
  const model = learn(pairs)
  const rev = reverse(model)
  // test them all
  pairs.forEach((a) => {
    const created = convert(a[1], rev)
    t.equal(created, a[0], `[future-rev] '${a[0]}' -> '${created}'`)
  })
  t.end()
})

test('french-nous:', function (t) {
  const pairs = validate(nous)
  const model = learn(pairs)
  const rev = reverse(model)
  // test them all
  pairs.forEach((a) => {
    const created = convert(a[1], rev)
    t.equal(created, a[0], `[nous-rev] '${a[0]}' -> '${created}'`)
  })
  t.end()
})
