
const trimDown = function (issues, best) {
  let reg = new RegExp(best[0] + '$')
  issues = issues.filter(a => {
    if (!a[0].match(reg)) {
      return true//still a problem
    }
    if (a[0].replace(reg, best[1]) === a[1]) {
      return false
    }
    return true
  })
  return issues
}

const findRemaining = function (pairs, main) {
  pairs = pairs.filter(a => !main.exceptions.hasOwnProperty(a[0]))
  main.rules.forEach(rule => {
    pairs = trimDown(pairs, rule)
  })
  return pairs
}

export { trimDown, findRemaining }