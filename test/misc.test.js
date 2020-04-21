const test = require('tape')
const thumb = require('../src')

test('misc:', function (t) {
  const words = [
    ['walk', 'walking'],
    ['smoke', 'smoking'],
    ['talk', 'talking'],
  ]
  let res = thumb(words)
  t.equal(res.rules.length, 1, 'one rule')
  t.equal(res.rules[0][0], 'lk', 'lk')
  t.equal(res.rules[0][1], 'lking', 'lking')
  t.ok(res.percent > 60, 'coverage is good')
  t.end()
})
