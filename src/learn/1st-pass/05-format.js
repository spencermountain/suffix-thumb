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
  return rules.map((o) => [o.from, o.to])
}

const format = function (rules, pairs) {
  let exceptions = {}
  rules.forEach((rule) => {
    Object.assign(exceptions, rule.exceptions)
  })
  rules = fmtRules(rules)

  // find remaining pairs with no rule
  let remaining = pairs.filter((pair) => {
    if (exceptions.hasOwnProperty(pair[0])) {
      return false
    }
    // console.log(rules.find((rule) => pair[0].endsWith(rule.from)))
    if (rules.find((rule) => pair[0].endsWith(rule.from))) {
      return false
    }
    return true
  })
  // add them to exceptions list
  remaining.forEach(a => {
    exceptions[a[0]] = a[1]
  })
  return {
    rules,
    exceptions: exceptions,
  }
}
export default format
