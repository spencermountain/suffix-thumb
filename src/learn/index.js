import getAll from './01-getAll.js'
import findBest from './02-findBest.js'
import rank from './03-rank.js'
import squeeze from './04-squeeze.js'
import format from './05-format.js'
import postProcess from './06-postProcess.js'
import pack from './08-pack.js'
import toRules from './07-toRules.js'

const find = function (pairs) {
  pairs = pairs.filter((a) => a && a[0] && a[1])
  // look at all patterns
  const suffixes = getAll(pairs)
  // look for the greatest patterns
  let best = findBest(suffixes)
  // run pattern against the pairs
  let rules = rank(best, pairs)
  // remove duplicates
  rules = squeeze(rules)
  // nice result format
  return format(rules, pairs)
}

const wrapper = function (pairs) {
  let inputSize = pairs.length
  let res = {}
  let found = find(pairs)
  res.rules = found.rules || []
  res.exceptions = found.remaining.concat(Object.entries(found.exceptions))
  res = postProcess(res, inputSize)
  res = toRules(res, pairs)
  res = pack(res)
  return res
}
export default wrapper
