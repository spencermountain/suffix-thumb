/* eslint-disable no-console */
import test from 'tape'
import { learn, test as score } from './lib/_lib.js'

const capture = function (pairs, model) {
  const lines = []
  const original = console.log
  console.log = (...args) => lines.push(args)
  try {
    score(pairs, model)
  } finally {
    console.log = original
  }
  return lines
}

test('test helper checks repeated forward targets', function (t) {
  const pairs = [['poner', 'puesto'], ['ponerse', 'puesto']]
  const incomplete = { fwd: {}, both: {}, rev: {}, ex: { poner: 'puesto' } }
  const lines = capture(pairs, incomplete)
  t.equal(lines.length, 2, 'reports the failure and summary')
  t.deepEqual(lines[0][1], pairs[1], 'identifies the missing forward mapping')
  t.ok(lines[1][0].includes('50%'), 'scores both forward pairs')
  t.ok(lines[1][0].includes('100%'), 'scores only the first reverse target')
  const good = capture(pairs, learn(pairs))
  t.equal(good.length, 1, 'a learned model has no failures')
  t.equal((good[0][0].match(/100%/g) || []).length, 2, 'both directions pass')
  t.end()
})

test('test helper matches learning validation', function (t) {
  const pairs = [['cat', 'cats'], ['cat', 'kittens'], ['dog', 'dogs'], ['mp3', 'mp3s'], null]
  const lines = capture(pairs, learn(pairs))
  t.equal(lines.length, 1, 'ignores later left-side duplicates and invalid pairs')
  t.equal((lines[0][0].match(/100%/g) || []).length, 2, 'both directions pass')
  t.end()
})

test('test helper handles empty input', function (t) {
  for (const pairs of [[], [null, ['mp3', 'mp3s']]]) {
    const lines = capture(pairs, learn(pairs))
    t.equal(lines.length, 1, 'only a summary')
    t.equal((lines[0][0].match(/N\/A \(no pairs\)/g) || []).length, 2, 'both scores explain the empty input')
  }
  t.end()
})
