
const findIssues = function (rules, exceptions, pairs) {
  let bckwrd = new Set(Object.values(exceptions))
  let resolved = []
  let issues = pairs.filter(a => !bckwrd.has(a[0]))

  issues = issues.filter(pair => {
    let [left, right] = pair
    let rule = rules.find(r => r.reg.test(left))
    if (!rule) {
      return true // still an issue
    }
    if (left.replace(rule.reg, rule.to) === right) {
      resolved.push(pair)
      return false //seems fine
    }
    return true
  })
  return {
    issues,
    resolved
  }
}
export default findIssues