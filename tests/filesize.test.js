import test from 'tape'
import { learn, compress } from './lib/_lib.js'
import filesize from './lib/filesize.js'
import esPlurals from './data/es-plurals.js'
import nous from './data/fr-nous.js'
import frWords from './data/fr-words.js'
import future from './data/future-simple.js'
import gerund from './data/gerund.js'
import itGerund from './data/it-gerund.js'
import pastParticiple from './data/past-participle.js'
import perfecto from './data/perfecto.js'
import presentTense from './data/present-tense.js'

let data = [
  { pairs: nous, name: 'nous', size: 1.5 },
  { pairs: frWords, name: 'frWords', size: 0.1 },
  { pairs: future, name: 'future', size: 0.7 },
  { pairs: gerund, name: 'gerund', size: 1.8 },
  { pairs: itGerund, name: 'itGerund', size: 1.8 },
  { pairs: pastParticiple, name: 'pastParticiple', size: 1.6 },
  { pairs: perfecto, name: 'perfecto', size: 0.6 },
  { pairs: presentTense, name: 'presentTense', size: 0.2 },
  { pairs: esPlurals, name: 'esPlurals', size: 5.0 },
]

test('filesizes:', function (t) {
  data.forEach(o => {
    let { pairs, size, name } = o
    let model = learn(pairs)
    let pkd = compress(model)
    let n = Number(filesize(pkd))
    let max = size * 1.1
    t.ok(n <= max, `${name} is ${n}kb - want ${size}kb`)
  })
  t.end()
})
