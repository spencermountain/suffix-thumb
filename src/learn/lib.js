
const noDupes = function (diffs, main) {
  let already = new Set()
  main.rules.forEach(m => {
    already.add(m[0])
  })
  diffs = diffs.filter(m => !already.has(m[0]))
  return diffs
}


const trimDown = function (issues, best) {
  let reg = new RegExp(best[0] + '$')
  return issues.filter(a => {
    if (!a[0].match(reg)) {
      return true//still a problem
    }
    if (a[0].replace(reg, best[1]) === a[1]) {
      return false
    }
    return true
  })
}

const findRemaining = function (pairs, main) {
  pairs = pairs.filter(a => !main.exceptions.hasOwnProperty(a[0]))
  main.rules.forEach(rule => {
    pairs = trimDown(pairs, rule)
  })
  return pairs
}

export { noDupes, trimDown, findRemaining }