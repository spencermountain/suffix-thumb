import test from 'tape'
import { learn, convert, reverse } from '../src/index.js'

// a rule keyed on the '' suffix matches every word, so it rewrites unknown
// words too. it is only allowed when the whole training list obeys it.
test('unknown words pass through unchanged:', function (t) {
  // 'haz' contradicts the "append r" catch-all, so it must not be learned
  const pairs = [
    ['hablar', 'habla'],
    ['comer', 'come'],
    ['hacer', 'haz']
  ]
  const model = learn(pairs)
  const rev = reverse(model)
  // training words still work, in both directions
  t.equal(convert('hablar', model), 'habla', 'fwd hablar')
  t.equal(convert('haz', rev), 'hacer', 'rev haz')
  // out-of-vocabulary words come back unchanged
  t.equal(convert('perro', rev), 'perro', 'unknown word untouched')
  t.equal(convert('xo', model), 'xo', 'unknown word untouched fwd')

  // when every pair agrees, the catch-all is still allowed
  const uniform = reverse(learn([['hablar', 'habla'], ['comer', 'come']]))
  t.equal(convert('habla', uniform), 'hablar', 'uniform rev habla')
  t.equal(uniform.both[''], 'r', 'uniform data keeps the catch-all rule')
  t.end()
})
