import test from 'tape'
import { learn, convert } from './lib/_lib.js'
import esPlurals from './data/es-plurals.js'
import nous from './data/fr-nous.js'
import frWords from './data/fr-words.js'
import future from './data/future-simple.js'
import gerund from './data/gerund.js'
import itGerund from './data/it-gerund.js'
import pastParticiple from './data/past-participle.js'
import perfecto from './data/perfecto.js'
import presentTense from './data/present-tense.js'

test('esPlurals:', function (t) {
  let model = learn(esPlurals)
  esPlurals.forEach((a) => {
    t.equal(convert(a[0], model), a[1], `[esPlurals] '${a[0]}'`)
  })
  t.end()
})

test('nous:', function (t) {
  let model = learn(nous)
  nous.forEach((a) => {
    t.equal(convert(a[0], model), a[1], `[nous] '${a[0]}'`)
  })
  t.end()
})

test('frWords:', function (t) {
  let model = learn(frWords)
  frWords.forEach((a) => {
    t.equal(convert(a[0], model), a[1], `[frWords] '${a[0]}'`)
  })
  t.end()
})

test('future:', function (t) {
  let model = learn(future)
  future.forEach((a) => {
    t.equal(convert(a[0], model), a[1], `[future] '${a[0]}'`)
  })
  t.end()
})

test('gerund:', function (t) {
  let model = learn(gerund)
  gerund.forEach((a) => {
    t.equal(convert(a[0], model), a[1], `[gerund] '${a[0]}'`)
  })
  t.end()
})

test('itGerund:', function (t) {
  let model = learn(itGerund)
  itGerund.forEach((a) => {
    t.equal(convert(a[0], model), a[1], `[itGerund] '${a[0]}'`)
  })
  t.end()
})

test('pastParticiple:', function (t) {
  let model = learn(pastParticiple)
  pastParticiple.forEach((a) => {
    t.equal(convert(a[0], model), a[1], `[pastParticiple] '${a[0]}'`)
  })
  t.end()
})

test('perfecto:', function (t) {
  let model = learn(perfecto)
  perfecto.forEach((a) => {
    t.equal(convert(a[0], model), a[1], `[perfecto] '${a[0]}'`)
  })
  t.end()
})

test('presentTense:', function (t) {
  let model = learn(presentTense)
  presentTense.forEach((a) => {
    t.equal(convert(a[0], model), a[1], `[presentTense] '${a[0]}'`)
  })
  t.end()
})

