import test from 'tape'
import { learn, compress } from '../src/index.js'
import filesize from '../tests/lib/filesize.js'
import esPlurals from '../tests/data/es-plurals.js'
import nous from '../tests/data/fr-nous.js'
import frWords from '../tests/data/fr-words.js'
import future from '../tests/data/future-simple.js'
import gerund from '../tests/data/gerund.js'
import itGerund from '../tests/data/it-gerund.js'
import pastParticiple from '../tests/data/past-participle.js'
import perfecto from '../tests/data/perfecto.js'
import presentTense from '../tests/data/present-tense.js'

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

const green = str => '\x1b[32m' + str + '\x1b[0m'
const red = str => '\x1b[31m' + str + '\x1b[0m'
data.forEach(o => {
  let { pairs, size, name } = o
  let model = learn(pairs)
  let pkd = compress(model)
  let n = filesize(pkd)
  if (n <= size) {
    console.log(`✅ ${name} is ${green(n + 'kb')}`)
  } else {
    console.log(`❌ ${name} is ${red(n + 'kb')} -   want ${size}kb`)
  }
})

