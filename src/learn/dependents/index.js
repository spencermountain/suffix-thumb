import candidates from '../candidates/index.js'
import { trimDown } from '../lib.js'

const findProblems = function (diff, pairs) {
  let issues = []
  let good = []
  pairs.forEach(pair => {
    let [left, right] = pair
    let reg = new RegExp(diff[0] + '$')
    if (!left.match(reg)) {
      return //unrelated
    }
    let res = left.replace(reg, diff[1])
    if (res !== right) {
      issues.push(pair)
    } else {
      good.push(pair)
    }
  })
  return { issues, good }
}

const noCollision = function (diffs, good) {
  diffs = diffs.filter(diff => {
    return !good.some((a) => a[0].endsWith(diff[0]))
  })
  return diffs
}

const solveProblems = function (top, pairs) {
  // console.log(top, ':')
  let exceptions = {}
  if (!top) {
    pairs.forEach(a => {
      exceptions[a[0]] = a[1]
    })
    return { rules: [], exceptions }
  }
  let rules = []
  let { issues, good } = findProblems(top, pairs)
  while (issues.length > 0) {
    let diffs = candidates(issues, rules)
    diffs = noCollision(diffs, good)
    // no rules, only exceptions?
    if (diffs.length === 0) {
      issues.forEach(a => {
        exceptions[a[0]] = a[1]
      })
      // break out of while-loop
      break
    }
    let res = trimDown(issues, diffs[0])
    issues = res.fail
    good = good.concat(res.pass)
    rules.unshift(diffs[0].slice(0, 2))
  }
  rules.push(top.slice(0, 2))
  return { rules, exceptions }
}
export default solveProblems