import test from 'tape'
import { learn, compress } from '../src/index.js'

test('one rule:', function (t) {
  const words = [
    ['walk', 'walking'],
    ['smoke', 'smoking'],
    ['talk', 'talking'],
  ]
  let res = learn(words)
  // res = compress(res)
  t.equal(res.rules.k.length, 1, 'one rule')
  t.equal(res.rules.k[0][0], 'lk', 'lk')
  t.equal(res.rules.k[0][1], 'lking', 'lking')
  t.ok(res.coverage > 0.6, 'coverage is good')
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
  t.equal(res.rules.k[0][0], 'lk', 'lk')
  // t.equal(res.rules.e[0][0], 'e', 'e')
  t.ok(res.coverage > 0.6, 'coverage is good')
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
  t.equal(res.coverage, 1, 'coverage is good')
  t.end()
})
