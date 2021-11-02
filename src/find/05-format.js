function reverse(str) {
  return str.split('').reverse().join('')
}

// because exceptions are defined by rule,
// we may have some that are now covered
const reduceExceptions = function (exceptions, rules) {
  let final = {}
  Object.keys(exceptions).forEach(k => {
    let found = rules.find((rule) => {
      return k.endsWith(rule[0])
    })
    if (!found) {
      final[k] = exceptions[k]
    }
    let tmp = k.replace(found[0], found[1])
    // did we do it wrong?
    if (tmp !== exceptions[k]) {
      final[k] = exceptions[k]
    } else {
      console.log(k)
    }
  })
  return final
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
  rules = fmtRules(rules)
  // exceptions = reduceExceptions(exceptions, rules)

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
    rules,
    exceptions: exceptions,
    coverage: percent,
    remaining: untouched,
  }
}
export default format
