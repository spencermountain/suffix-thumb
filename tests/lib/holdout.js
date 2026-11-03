import { learn, convert, reverse, validate } from './_lib.js'
import esPlurals from '../data/es-plurals.js'
import nous from '../data/fr-nous.js'
import frWords from '../data/fr-words.js'
import future from '../data/future-simple.js'
import gerund from '../data/gerund.js'
import itGerund from '../data/it-gerund.js'
import pastParticiple from '../data/past-participle.js'
import pastTense from '../data/past-tense.js'
import perfecto from '../data/perfecto.js'
import presentTense from '../data/present-tense.js'

// expected % of unseen pairs converted correctly, in each direction
const data = [
  { pairs: esPlurals, name: 'esPlurals', fwd: 98, rev: 97.4 },
  { pairs: nous, name: 'nous', fwd: 99.4, rev: 99.2 },
  { pairs: frWords, name: 'frWords', fwd: 92.6, rev: 92.6 },
  { pairs: future, name: 'future', fwd: 98.9, rev: 98.3 },
  { pairs: gerund, name: 'gerund', fwd: 95.9, rev: 95.9 },
  { pairs: itGerund, name: 'itGerund', fwd: 99.6, rev: 98.4 },
  { pairs: pastParticiple, name: 'pastParticiple', fwd: 99.4, rev: 99.4 },
  { pairs: pastTense, name: 'pastTense', fwd: 90.9, rev: 87.7 },
  { pairs: perfecto, name: 'perfecto', fwd: 100, rev: 89.5 },
  { pairs: presentTense, name: 'presentTense', fwd: 99.5, rev: 99.5 },
]

// the same shuffle every time
const seeded = function (seed) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return seed
  }
}

const percent = (part, total) => Math.round((part / total) * 1000) / 10

// learn from 90% of the pairs, and score the model on the 10% it has not seen
const holdout = function (input, opts = {}) {
  const rand = seeded(42)
  const pairs = validate(input)
    .map(a => [rand(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1])
  const cut = Math.floor(pairs.length * 0.9)
  const unseen = pairs.slice(cut)
  const model = learn(pairs.slice(0, cut), opts)
  const rev = reverse(model)
  return {
    fwd: percent(unseen.filter(([a, b]) => convert(a, model) === b).length, unseen.length),
    rev: percent(unseen.filter(([a, b]) => convert(b, rev) === a).length, unseen.length),
  }
}

export { data, holdout }
