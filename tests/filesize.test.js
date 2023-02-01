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
  { pairs: nous, name: 'nous', size: 2.6 },
  { pairs: frWords, name: 'frWords', size: 0.2 },
  { pairs: future, name: 'future', size: 0.9 },
  { pairs: gerund, name: 'gerund', size: 5.9 },
  { pairs: itGerund, name: 'itGerund', size: 3.3 },
  { pairs: pastParticiple, name: 'pastParticiple', size: 3.1 },
  { pairs: perfecto, name: 'perfecto', size: 0.9 },
  { pairs: presentTense, name: 'presentTense', size: 0.3 },
  { pairs: esPlurals, name: 'esPlurals', size: 7.3 },
]

test('filesizes:', function (t) {
  data.forEach(o => {
    let { pairs, size, name } = o
    let model = learn(pairs)
    let pkd = compress(model)
    let max = size * 1.1
    let n = filesize(pkd)
    t.ok(size < max, `${name} is ${n}kb - want ${size}kb`)
  })
  t.end()
})

