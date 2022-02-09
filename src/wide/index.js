import find from './01-getAll.js'
import score from './02-score.js'
import solveFor from './solveProblems.js'
import { indexRules } from '../_lib.js'


const noDupes = function (diffs, main) {
  let already = new Set()
  main.rules.forEach(m => {
    already.add(m[0])
  })
  diffs = diffs.filter(m => !already.has(m[0]))
  return diffs
}

const merge = function (main, updates) {
  main.exceptions = Object.assign(main.exceptions, updates.exceptions)
  main.rules = updates.rules.concat(main.rules)
  return main
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

const wide = function (pairs, opts) {
  let main = { rules: [], exceptions: {} }

  while (pairs.length > 0) {
    let diffs = find(pairs)
    diffs = score(diffs, pairs)
    diffs = noDupes(diffs, main)
    let updates = solveFor(diffs[0], pairs)
    console.log('   + ' + updates.rules.length + ' rules')
    console.log('   + ' + Object.keys(updates.exceptions).length + ' exceptions')
    if (updates) {
      main = merge(main, updates)
    }
    pairs = findRemaining(pairs, main)
    console.log(pairs.length + ' remaining\n\n')
  }
  console.log('\n\n\n\n')
  // console.log(main)

  main.rules = indexRules(main.rules)
  return main
}
export default wide