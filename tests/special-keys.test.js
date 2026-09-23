import test from 'tape'
import { learn, convert, reverse, compress, uncompress } from './lib/_lib.js'

const keys = ['__proto__', 'hasOwnProperty', 'constructor', 'toString']

test('learn words that match object properties', function (t) {
  const pairs = keys.map(key => [key, `changed-${key}`])
  pairs.push(['walk', 'walked'], ['talk', 'talked'])
  for (const input of [pairs, pairs.map(([a, b]) => [b, a])]) {
    for (const opts of [{}, { min: 100 }, { reverse: false }]) {
      const model = learn(input, opts)
      for (const restored of [model, uncompress(compress(model)), JSON.parse(JSON.stringify(model))]) {
        input.forEach(([a, b]) => {
          t.equal(convert(a, restored), b, `${a} → ${b}`)
          if (opts.reverse !== false) {
            t.equal(convert(b, reverse(restored)), a, `${b} → ${a}`)
          }
        })
        Object.values(restored).forEach(section => {
          t.equal(Object.getPrototypeOf(section), Object.prototype, 'public dictionaries remain plain objects')
        })
      }
    }
  }
  t.end()
})

test('special keys as shared reverse targets', function (t) {
  keys.forEach(key => {
    const model = learn([['first', key], ['second', key], ['third', 'other']])
    const restored = uncompress(compress(model))
    t.equal(convert('first', restored), key, 'first maps forward')
    t.equal(convert('second', restored), key, 'duplicate target maps forward')
    t.equal(convert(key, reverse(restored)), 'first', 'first reverse pair wins')
  })
  t.end()
})

test('special keys in every model section', function (t) {
  for (const section of ['fwd', 'both', 'rev', 'ex']) {
    const model = { fwd: {}, both: {}, rev: {}, ex: {} }
    model[section] = Object.fromEntries(keys.map(key => [key, `changed-${key}`]))
    const restored = uncompress(compress(model))
    t.deepEqual(restored, model, `${section} survives packing`)
    const active = section === 'rev' ? reverse(restored) : restored
    keys.forEach(key => {
      t.equal(convert(key, active), `changed-${key}`, `${section}: whole word ${key}`)
      const expected = section === 'ex' ? `prefix-${key}` : `prefix-changed-${key}`
      t.equal(convert(`prefix-${key}`, active), expected, `${section}: suffix ${key}`)
      if (section === 'both' || section === 'ex') {
        // Reverse twice so special keys are written by reverse() as well.
        t.deepEqual(reverse(reverse(restored))[section], model[section], `${section}: reverse twice`)
      }
    })
  }
  const inherited = Object.create({ word: 'wrong' })
  t.equal(convert('word', { fwd: inherited }), 'word', 'inherited properties are not rules')
  t.equal(convert('word', { fwd: Object.assign(Object.create(null), { word: 'right' }) }), 'right', 'null-prototype input is supported')
  t.end()
})
