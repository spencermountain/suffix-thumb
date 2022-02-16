import generate from './generate.js'
import clean from './clean.js'
import score from './score.js'

const findRules = function (pairs, opts = {}) {
  let rules = generate(pairs)
  rules = score(rules, pairs, opts)
  rules = clean(rules)
  return rules
}

const updateRules = function (rules, pairs, opts) {
  rules = score(rules, pairs, opts)
  rules = clean(rules)
  return rules
}
export { findRules, updateRules }