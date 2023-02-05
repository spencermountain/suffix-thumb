import test from 'tape'
import { classifier, classify } from './lib/_lib.js'
import esPlurals from './data/es-plurals.js'
import nous from './data/fr-nous.js'
import frWords from './data/fr-words.js'
import future from './data/future-simple.js'
import gerund from './data/gerund.js'
import itGerund from './data/it-gerund.js'
import pastParticiple from './data/past-participle.js'
import perfecto from './data/perfecto.js'
import presentTense from './data/present-tense.js'

let datasets = [
  esPlurals,
  nous,
  frWords,
  future,
  gerund,
  itGerund,
  pastParticiple,
  perfecto,
  presentTense,
]

let names = [
  'esPlurals',
  'nous',
  'frWords',
  'future',
  'gerund',
  'itGerund',
  'pastParticiple',
  'perfecto',
  'presentTense',
]

const toInput = (pairs) => {
  let input = {}
  pairs.forEach(p => {
    input[p[0]] = 'Left'
    input[p[1]] = 'Right'
  })
  return input
}

test('classifier:', function (t) {
  datasets.forEach((pairs, i) => {
    let model = classifier(toInput(pairs))
    let name = names[i]
    pairs.forEach((a) => {
      t.equal(classify(a[0], model), 'Left', `[${name}] '${a[0]}'`)
      t.equal(classify(a[1], model), 'Right', `[${name}] '${a[0]}'`)
    })
  })
  t.end()
})

