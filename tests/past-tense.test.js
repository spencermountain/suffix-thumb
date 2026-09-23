import test from 'tape'
import { learn, convert, reverse, compress, uncompress, validate } from './lib/_lib.js'
import pastTense from './data/past-tense.js'

for (const flipped of [false, true]) {
  for (const reordered of [false, true]) {
    const direction = flipped ? 'base to past' : 'past to base'
    const order = reordered ? 'reversed order' : 'original order'
    test(`past tense: ${direction}, ${order}`, function (t) {
      const input = flipped ? pastTense.map(([a, b]) => [b, a]) : pastTense.slice()
      if (reordered) {
        input.reverse()
      }
      // Conflicting left-side entries use the first pair, as learn() does.
      const pairs = validate(input, { reverse: false })
      const first = new Map()
      pairs.forEach(([a, b]) => {
        if (!first.has(b)) {
          first.set(b, a)
        }
      })
      const [from, to] = flipped ? ['bite', 'bit'] : ['bit', 'bite']
      for (const min of [0, 2]) {
        const learned = learn(input, { min })
        for (const [name, model] of [
          ['raw', learned],
          ['packed', uncompress(compress(learned))],
        ]) {
          const label = `${name}, min=${min}`
          const rev = reverse(model)
          t.equal(convert(from, model), to, `${label}: ${from} → ${to}`)
          t.equal(convert(to, rev), from, `${label}: ${to} → ${from}`)
          t.deepEqual(pairs.filter(([a, b]) => convert(a, model) !== b), [], `${label}: all forward pairs`)
          t.deepEqual([...first].filter(([b, a]) => convert(b, rev) !== a), [], `${label}: all reverse pairs`)
        }
      }
      t.end()
    })
  }
}
