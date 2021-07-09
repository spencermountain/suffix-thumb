function reverse(str) {
  return str.split('').reverse().join('')
}

const fmtRules = function (rules) {
  // sort by length, then by suffix
  rules = rules.sort((a, b) => {
    if (a.from.length > b.from.length) {
      return -1
    } else if (a.from.length < b.from.length) {
      return 1
    }
    a = reverse(a.from)
    b = reverse(b.from)
    if (a > b) {
      return 1
    } else if (a < b) {
      return -1
    }
    return 0
  })
  return rules.map((o) => [o.from, o.to, o.yes])
}

const format = function (rules, pairs) {
  let exceptions = {}
  rules.forEach((rule) => {
    Object.assign(exceptions, rule.exceptions)
  })
  // find remaining pairs with no rule
  let untouched = pairs.filter((pair) => {
    if (exceptions.hasOwnProperty(pair[0])) {
      return false
    }
    // console.log(rules.find((rule) => pair[0].endsWith(rule.from)))
    if (rules.find((rule) => pair[0].endsWith(rule.from))) {
      return false
    }
    return true
  })
  let coverage = pairs.length - untouched.length
  let percent = coverage / pairs.length
  return {
    rules: fmtRules(rules),
    exceptions: exceptions,
    coverage: percent,
    remaining: untouched,
  }
}
export default format
