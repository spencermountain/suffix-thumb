import generate from './find/00-generate.js'
import consider from './find/01-consider.js'

const findRules = function (pairs, finished, opts) {
  let threshold = opts.threshold || 80
  let pending = pairs.slice(0)
  let rules = {}
  // small rules first
  for (let peek = 0; peek < 6; peek += 1) {
    for (let i = 0; i < pending.length; i += 1) {
      let rule = generate(pending[i], peek)
      let result = consider(rule, pending, opts)
      // did it do okay?
      if (result.total > 1 && result.percent > threshold) {
        // add it to our rules
        rules[rule.from] = rule.to
        // update pending/finished lists
        pending = pending.filter(p => {
          if (result.clear.has(p[0])) {
            finished.push(p)
            return false
          }
          return true
        })
      }
    }
  }
  return { rules, pending, finished }
}
export default findRules