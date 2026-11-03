import test from 'tape'
import { data, holdout } from './lib/holdout.js'

// a smaller model is no good if it gets worse at words it hasn't seen
test('unseen words:', function (t) {
  data.forEach(o => {
    const { pairs, name, fwd, rev } = o
    const res = holdout(pairs)
    t.ok(res.fwd >= fwd - 1, `${name} forward is ${res.fwd}% - want ${fwd}%`)
    t.ok(res.rev >= rev - 1, `${name} backward is ${res.rev}% - want ${rev}%`)
  })
  t.end()
})
