import prepare from './00-prep.js'
import findRules from './01-findRules.js'
import tryBackward from './02-try-backward.js'
// import revRules from './03-reverseRules.js'

const swap = (a) => [a[1], a[0]]

const learn = function (pairs, opts = {}) {
  opts.threshold = opts.threshold || 80
  let ex = {}
  pairs = prepare(pairs, ex)
  // get forward-dir rules
  let { rules, pending, finished } = findRules(pairs, [], opts)
  // move some to both
  let { fwd, both, revPairs } = tryBackward(rules, pairs.map(swap), opts)
  // generate remaining reverse-dir rules
  if (opts.reverse !== false) {
    // let { rev } = revRules(shared.pending, shared.finished)
  }
  return {
    fwd,
    both,
  }
}
export default learn