import test from 'tape'
import { learn, convert, compress, uncompress, reverse } from './lib/_lib.js'
import frWords from './data/fr-words.js'
import gerund from './data/gerund.js'
import presentTense from './data/present-tense.js'


test('frWords:', function (t) {
  let model = learn(frWords)
  model = uncompress(compress(model))
  // test forward
  frWords.forEach((a) => t.equal(convert(a[0], model), a[1], `[frWords] '${a[0]}'`))
  // test backward
  model = reverse(model)
  frWords.forEach((a) => t.equal(convert(a[1], model), a[0], `[bkwd frWords] '${a[0]}'`))
  t.end()
})

test('gerund:', function (t) {
  let model = learn(gerund)
  model = uncompress(compress(model))
  // test forward
  gerund.forEach((a) => t.equal(convert(a[0], model), a[1], `[gerund] '${a[0]}'`))
  // test backward
  model = reverse(model)
  gerund.forEach((a) => t.equal(convert(a[1], model), a[0], `[bkwd gerund] '${a[0]}'`))
  t.end()
})


test('presentTense:', function (t) {
  let model = learn(presentTense)
  model = uncompress(compress(model))
  // test forward
  presentTense.forEach((a) => t.equal(convert(a[0], model), a[1], `[presentTense] '${a[0]}'`))
  // test backward
  model = reverse(model)
  presentTense.forEach((a) => t.equal(convert(a[1], model), a[0], `[bkwd presentTense] '${a[0]}'`))
  t.end()
})


