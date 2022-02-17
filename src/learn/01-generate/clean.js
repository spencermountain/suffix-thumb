const noDupes = function (rules) {
  let already = new Set()
  rules = rules.filter(r => {
    if (already.has(r.from)) {
      return false
    }
    already.add(r.from)
    return true
  })
  return rules
}

const cleanup = function (rules) {
  // only helpful ones
  rules = rules.filter(r => r.yes > 0 && r.yes > r.no)
  // one rule per suffix
  rules = noDupes(rules)
  return rules
}
export default cleanup