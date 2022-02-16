
const trimPairs = function (pairs, rule) {
  let { reg, to } = rule
  let done = []
  let remain = pairs.filter(pair => {
    let [left, right] = pair
    if (left.match(reg)) {
      if (left.replace(reg, to) === right) {
        done.push(pair)
        return false //done with it
      }
    }
    return true // keep it
  })
  return { remain, done }
}

const trimRules = function (rules, rule) {
  return rules.filter(r => {
    if (r.from.endsWith(rule.from)) {
      return false
    }
    return true
  })
}


export { trimRules, trimPairs }