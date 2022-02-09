import find from './01-getAll.js'
import score from './02-score.js'

const findProblems = function (diff, pairs) {
  let issues = []
  pairs.forEach(pair => {
    let [left, right] = pair
    let reg = new RegExp(diff[0] + '$')
    if (!left.match(reg)) {
      return //unrelated
    }
    let res = left.replace(reg, diff[1])
    if (res !== right) {
      issues.push(pair)
    }
  })
  return issues
}

const noDupes = function (diffs, main) {
  let already = new Set()
  main.forEach(m => {
    already.add(m[0])
  })
  diffs = diffs.filter(m => !already.has(m[0]))
  return diffs
}

const trimIssues = function (issues, best) {
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


const solveProblems = function (top, pairs) {
  console.log(top)
  let issues = pairs
  let rules = [top]
  let exceptions = {}
  issues = findProblems(top, issues)
  while (issues.length > 0) {
    console.log(issues.length, 'issues')
    let diffs = find(issues)
    diffs = score(diffs, issues)
    diffs = noDupes(diffs, rules)
    // no rules, only exceptions?
    if (diffs.length === 0) {
      issues.forEach(a => {
        exceptions[a[0]] = a[1]
      })
      // break out of while-loop
      break
    }
    issues = trimIssues(issues, diffs[0])
    rules.unshift(diffs[0])
  }
  return { rules, exceptions }
}
export default solveProblems