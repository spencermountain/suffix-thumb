import convert from '../convert/index.js'
import reverse from '../reverse/index.js'
import candidates from './candidates/index.js'

const suggestReverse = function (model, pairs) {
  let issues = []
  const rev = reverse(model)
  pairs.forEach(a => {
    let [left, right] = a
    if (convert(right, rev) !== left) {
      issues.push(a.slice(0, 2).reverse())
    }
  })
  let rules = []
  Object.keys(rev.rules).forEach(k => {
    rules = rules.concat(rev.rules[k])
  })
  let diffs = candidates(issues, rules)
  return diffs
}
export default suggestReverse