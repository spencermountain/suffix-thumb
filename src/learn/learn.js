import validate from '../validate/index.js'
import { findRules, updateRules } from './01-generate/index.js'
import { trimPairs, trimRules } from './02-trim/index.js'

const learn = function (pairs, opts = {}) {
  pairs = validate(pairs, opts)
  let rules = findRules(pairs)
  let pairsLeft = pairs
  let pairsDone = []
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
      console.log(`\n${rule.from} -> ${rule.to || "''"}`)
      console.log(`    \x1b[32m +${res.done.length.toLocaleString()} pairs\x1b[0m`)
      console.log('   ', pairsLeft.length, 'remaining')
      console.log('   ', rules.length, 'rules left')
    }
  }

  // turn em upside-down
  chosen = chosen.reverse()

  // remaining pairs are exceptions
  let exceptions = pairsLeft.reduce((h, a) => {
    h[a[0]] = a[1]
    return h
  }, {})

  return {
    rules: chosen,
    exceptions
  }
}
export default learn