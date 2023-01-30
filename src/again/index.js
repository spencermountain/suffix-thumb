import findRules from './01-findRules.js'
import shareRules from './02-shareRules.js'
import revRules from './03-reverseRules.js'

const learn = function (pairs, opts = {}) {
  let threshold = opts.threshold || 80
  // get forward-dir rules
  let { fwd, ex } = findRules(pairs, threshold)
  // move some to both
  let model = shareRules(fwd, pairs, threshold)
  model.ex = ex
  // generate remaining reverse-dir rules
  model = revRules(pairs, model, threshold)
  return model
}
export default learn