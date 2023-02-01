import prepare from './00-prep.js'
import findRules from './find/index.js'
import shareRules from './02-shareRules.js'
import revRules from './03-reverseRules.js'

const learn = function (pairs, opts = {}) {
  let threshold = opts.threshold || 80
  let ex = {}
  pairs = prepare(pairs, ex)
  // get forward-dir rules
  let fwd = findRules(pairs, threshold, ex)
  // move some to both
  let model = shareRules(fwd, pairs, threshold)
  // model.ex = ex
  // generate remaining reverse-dir rules
  if (opts.reverse !== false) {
    // model = revRules(pairs, model, threshold)
  }
  return model
}
export default learn