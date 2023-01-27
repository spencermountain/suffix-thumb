import test from 'tape'
import { learn, compress } from '../src/index.js'

test('find best rule', function (t) {
  let arr = [
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
  let model = learn(arr)
  t.equal(model.both.ing, '', 'one-rule')
  t.equal(Object.keys(model.ex).length, 0, 'no-exceptions')
  t.end()
})