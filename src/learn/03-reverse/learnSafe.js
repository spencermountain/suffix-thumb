import { findRules, updateRules } from '../01-generate/index.js'
import { trimPairs, trimRules } from '../02-trim/index.js'

// like learn, but mindful for collisions w/ already-resolved pairs
const learnSafe = function (issues, resolved, opts) {
  let rules = findRules(issues)
  // trim any that interfere with resolved
  rules = trimRules(rules, resolved, true)

  let remaining = issues
  let pairsDone = []
  let chosen = []

  // pick our top rule
  while (remaining.length > 0 && rules.length > 0) {
    let rule = rules.pop()
    chosen.push([rule.from, rule.to])

    // remove now-covered pairs
    let res = trimPairs(remaining, rule)
    remaining = res.remain
    pairsDone = pairsDone.concat(res.done)

    // remove now-unsafe rules
    rules = trimRules(rules, pairsDone)
    // re-rank our rules
    rules = updateRules(rules, remaining, opts)

    // logging
    if (opts.debug) {
      console.log(`${rule.from} -> ${rule.to || "''"}`)
      console.log(`    \x1b[32m +${res.done.length.toLocaleString()} pairs\x1b[0m`)
      console.log('   ', remaining.length, 'remaining')
      console.log('   ', rules.length, 'rules left')
    }
  }
  // turn em upside-down
  chosen = chosen.reverse()

  // remaining pairs are exceptions
  let exceptions = remaining.reduce((h, a) => {
    h[a[1]] = a[0]//pre-reversed
    return h
  }, {})

  return {
    rules: chosen,
    exceptions
  }
}
export default learnSafe