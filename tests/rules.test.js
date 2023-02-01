import test from 'tape'
import { learn, compress } from './lib/_lib.js'

test('find best rule', function (t) {
  let pairs = [
    ['neighbouring', 'neighbour'],
    ['colouring', 'colour'],
    ['flavouring', 'flavour'],
    ['touring', 'tour'],
    ['scouring', 'scour'],
    ['honouring', 'honour'],
    ['favouring', 'favour'],
    ['labouring', 'labour'],
    ['devouring', 'devour'],
    ['harbouring', 'harbour'],
    ['clamouring', 'clamour'],
    ['pouring', 'pour'],
    ['contouring', 'contour'],
    ['endeavouring', 'endeavour']
  ]
  let model = learn(pairs)
  t.equal(model.both.ing, '', 'both-rule')
  t.equal(Object.keys(model.ex || {}).length, 0, 'no-exceptions')
  t.end()
})


test('same test', function (t) {
  let pairs = [
    ['acool', 'agood'],
    ['bcool', 'bgood'],
    ['ccool', 'cgood'],
    ['dcool', 'dgood'],
    ['ecool', 'egood'],
    ['gcool', 'ggood'],
    ['ooocool', 'ooocool'],//unchanged
  ]
  let model = learn(pairs)
  t.equal(model.both.cool, 'good', 'both-rule')
  // t.equal(model.same[0], 'ooocool', 'same-rule')
  t.end()
})


test('suffix isnt whole word', function (t) {
  let pairs = [
    ['croirai', 'croire'],
    ['cuirai', 'cuire'],
    ['croulerai', 'crouler'],
    ['cuisinerai', 'cuisiner'],
    ['déblayerai', 'déblayer'],
    ['débouillirai', 'débouillir'],
  ]
  let model = learn(pairs)
  t.equal(model.both.erai, 'er', 'both-rule')
  t.end()
})