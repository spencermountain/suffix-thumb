import validate from '../validate/index.js'
import { findRules, updateRules } from './01-generate/index.js'
import { trimPairs } from './02-trim/index.js'
import { indexRules } from '../_lib.js'

const learn = function (pairs, opts = {}, debug) {
  pairs = validate(pairs, opts)
  let rules = findRules(pairs)
  let pairsLeft = pairs
  let chosen = []

  // pick our top rule
  while (pairsLeft.length > 0 && rules.length > 0) {
    let rule = rules.pop()
    chosen.push([rule.from, rule.to])

    // remove covered pairs
    let res = trimPairs(pairsLeft, rule)
    pairsLeft = res.remain
    rules = updateRules(rules, pairsLeft, opts)

    // logging
    if (debug) {
      console.log(`${rule.from} -> ${rule.to || "''"}`)
      console.log(`    \x1b[32m +${res.done.length.toLocaleString()} pairs\x1b[0m`)
      console.log('    ', pairsLeft.length, 'remaining')
      console.log('   ', rules.length, 'rules left')
    }
  }
  // remaining pairs are exceptions
  let exceptions = pairsLeft.reduce((h, a) => {
    h[a[0]] = a[1]
    return h
  }, {})

  return {
    rules: indexRules(chosen.reverse()),
    exceptions
  }
}
export default learn