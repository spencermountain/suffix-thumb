import { findRules, updateRules } from '../01-generate/index.js'
import { trimPairs, trimRules } from '../02-trim/index.js'
import findIssues from './findIssues.js'


const compute = function (pairsLeft, pairsDone, rules, opts) {
  let chosen = []
  // pick our top rule
  while (pairsLeft.length > 0 && rules.length > 0) {
    let rule = rules.pop()
    chosen.push([rule.from, rule.to])

    // remove now-covered pairs
    let res = trimPairs(pairsLeft, rule)
    pairsLeft = res.remain
    pairsDone = pairsDone.concat(res.done)

    // remove now-unsafe rules
    rules = trimRules(rules, pairsDone)
    // re-rank our rules
    rules = updateRules(rules, pairsLeft, opts)

    // logging
    if (opts.debug) {
      console.log(`${rule.from} -> ${rule.to || "''"}`)
      console.log(`    \x1b[32m +${res.done.length.toLocaleString()} pairs\x1b[0m`)
      console.log('   ', pairsLeft.length, 'remaining')
      console.log('   ', rules.length, 'rules left')
    }
  }
  return { chosen, remain: pairsLeft }
}

const addReverse = function (rules, exceptions, pairs, opts = {}) {
  // reverse everything, first
  pairs = pairs.map(a => [a[1], a[0]])
  rules = rules.map(a => {
    let reg = new RegExp(a[1] + '$')
    return { from: a[1], to: a[0], reg: reg }
  })
  let { issues, resolved } = findIssues(rules, exceptions, pairs)
  // console.log(issues.length, 'issues')
  let suggest = findRules(issues)
  // console.log(suggest.length, 'suggestions')
  suggest = trimRules(suggest, resolved)
  // console.log(suggest.length, 'trimmed')
  let { chosen, remain } = compute(issues, resolved, suggest, opts)
  // logger
  if (opts.debug) {
    console.log('\nReverse:')
    console.log('  ' + issues.length, 'issues')
    console.log('  ' + resolved.length, 'resolved')
    console.log('  ' + chosen.length, 'new rules')
    console.log('  ' + remain.length, 'new exceptions')
  }
  // setup exceptions
  let ex = remain.reduce((h, a) => {
    h[a[1]] = a[0]
    return h
  }, {})
  return { rev: chosen, revEx: ex }
}
export default addReverse