import test from 'tape'
import { learn, convert, reverse, validate } from '../src/index.js'
import future from './data/future-simple.js'
import nous from './data/fr-nous.js'

test('future tense:', function (t) {
  let pairs = validate(future, { inverse: true })
  let model = learn(pairs)
  let rev = reverse(model)
  // test them all
  pairs.forEach((a) => {
    let created = convert(a[1], rev)
    t.equal(created, a[0], `[future-rev] '${a[0]}' -> '${created}'`)
  })
  t.end()
})

test('french-nous:', function (t) {
  let pairs = validate(nous, { inverse: true })
  let model = learn(nous)
  let rev = reverse(model)
  // test them all
  pairs.forEach((a) => {
    let created = convert(a[1], rev)
    t.equal(created, a[0], `[nous-rev] '${a[0]}' -> '${created}'`)
  })
  t.end()
})
