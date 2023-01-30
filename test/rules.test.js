import test from 'tape'
import { learn, compress } from '../src/index.js'

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


test('find best rule', function (t) {
  let pairs = [
    ['ocool', 'ocool'],
    ['acool', 'agood'],
    ['bcool', 'bgood'],
    ['ccool', 'cgood'],
    ['dcool', 'dgood'],
    ['ecool', 'egood'],
    ['gcool', 'ggood'],
  ]
  let model = learn(pairs)
  t.equal(model.fwd.cool, 'good', 'fwd-rule')
  t.equal(model.same[0], 'ocool', 'same-rule')
  t.end()
})