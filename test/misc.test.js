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
