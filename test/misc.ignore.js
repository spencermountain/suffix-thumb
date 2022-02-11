import test from 'tape'
import { learn, compress, convert } from '../src/index.js'

test('one rule:', function (t) {
  const words = [
    ['walk', 'walking'],
    ['smoke', 'smoking'],
    ['talk', 'talking'],
  ]
  let res = learn(words)
  // res = compress(res)
  t.equal(res.rules.k.length, 1, 'one rule')
  t.equal(res.rules.k[0][0], 'alk', 'alk')
  t.equal(res.rules.k[0][1], 'alking', 'alking')
  t.end()
})

test('two rules:', function (t) {
  const words = [
    ['walk', 'walking'],
    ['smoke', 'smoking'],
    ['create', 'creating'],
    ['talk', 'talking'],
  ]
  let res = learn(words)
  // res = compress(res)
  // t.equal(res.rules.k.length, 2, 'two rules')
  t.equal(res.rules.k[0][0], 'alk', 'alk')
  // t.equal(res.rules.e[0][0], 'e', 'e')
  t.end()
})

test('learn append:', function (t) {
  const words = [
    ['walk', 'walking'],
    ['wait', 'waiting'],
    ['sing', 'singing'],
  ]
  let res = learn(words)
  // res = compress(res)
  t.equal(res.rules[''].length, 1, 'one rules')
  // t.equal(res.rules.k[0][0], '', 'empty from prefix')
  t.equal(res.rules[''][0][1], 'ing', 'ing')
  t.end()
})

test('allow right-dupes', function (t) {
  let pairs = [
    ['left', 'right'],
    ['ok', 'right'],
  ]
  // kill dupes first
  let model = learn(pairs)
  t.equal(convert('left', model), 'right', 'left-right-1')
  t.equal(convert('ok', model), 'ok', 'ok-ok')

  // allow dupes
  model = learn(pairs, { inverse: false })
  t.equal(convert('left', model), 'right', 'left-right')
  t.equal(convert('ok', model), 'right', 'ok-right')

  t.end()
})
