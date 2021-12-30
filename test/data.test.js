import test from 'tape'
import { learn, convert, validate } from '../src/index.js'
import future from './data/future-simple.js'
import nous from './data/fr-nous.js'
import frWords from './data/fr-words.js'

test('future tense:', function (t) {
  let model = learn(future)
  // test them all
  future.forEach((a) => {
    let created = convert(a[0], model)
    t.equal(created, a[1], `[future] '${a[0]}' -> '${created}'`)
  })
  t.end()
})

test('french-nous:', function (t) {
  let pairs = validate(nous)
  let model = learn(pairs)
  // test them all
  pairs.forEach((a) => {
    let created = convert(a[0], model)
    t.equal(created, a[1], `[nous] '${a[0]}' -> '${created}'`)
  })
  t.end()
})

test('french-words:', function (t) {
  let pairs = validate(frWords)
  let model = learn(pairs)
  // test them all
  pairs.forEach((a) => {
    let created = convert(a[0], model)
    t.equal(created, a[1], `[frWords] '${a[0]}' -> '${created}'`)
  })
  t.end()
})
