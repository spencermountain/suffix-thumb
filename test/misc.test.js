import test from 'tape'
import { learn, convert, validate } from '../src/index.js'


test('use of same', function (t) {
  let pairs = [
    ['acool', 'agood'],
    ['bcool', 'bgood'],
    ['ccool', 'cgood'],
    ['dcool', 'dgood'],
    ['ecool', 'egood'],
    ['gcool', 'ggood'],
    ['ooocool', 'ooocool'],//unchanged
  ]
  let model = learn(pairs)
  // test them all
  pairs.forEach((a) => {
    let created = convert(a[0], model)
    t.equal(created, a[1], `[same] '${a[0]}' -> '${created}'`)
  })
  t.end()
})

test('suffix not whole word', function (t) {
  let pairs = [
    ['croirai', 'croire'],
    ['cuirai', 'cuire'],
    ['croulerai', 'crouler'],
    ['cuisinerai', 'cuisiner'],
    ['déblayerai', 'déblayer'],
    ['débouillirai', 'débouillir'],
  ]
  let model = learn(pairs)
  // test them all
  pairs.forEach((a) => {
    let created = convert(a[0], model)
    t.equal(created, a[1], `[whole-word] '${a[0]}' -> '${created}'`)
  })
  t.end()
})