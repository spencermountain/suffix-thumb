import findRules from './findRules.js'
import shareRules from './shareRules.js'

const learn = function (pairs, opts = {}) {
  let threshold = opts.threshold || 80
  let fwd = findRules(pairs, threshold)
  let model = shareRules(fwd, pairs, threshold)
  return model
}
export default learn