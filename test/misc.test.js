const test = require('tape')
const thumb = require('../src')

test('one rule:', function (t) {
  const words = [
    ['walk', 'walking'],
    ['smoke', 'smoking'],
    ['talk', 'talking'],
  ]
  let res = thumb(words)
  t.equal(res.rules.length, 1, 'one rule')
  t.equal(res.rules[0][0], 'lk', 'lk')
  t.equal(res.rules[0][1], 'lking', 'lking')
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
  let res = thumb(words)
  t.equal(res.rules.length, 2, 'two rules')
  t.equal(res.rules[0][0], 'lk', 'lk')
  t.equal(res.rules[1][0], 'e', 'e')
  t.ok(res.coverage > 0.6, 'coverage is good')
  t.end()
})

test('find append:', function (t) {
  const words = [
    ['walk', 'walking'],
    ['wait', 'waiting'],
    ['sing', 'singing'],
  ]
  let res = thumb(words)
  t.equal(res.rules.length, 1, 'one rules')
  t.equal(res.rules[0][0], '', 'empty from prefix')
  t.equal(res.rules[0][1], 'ing', 'ing')
  t.ok(res.coverage === 1, 'coverage is good')
  t.end()
})
