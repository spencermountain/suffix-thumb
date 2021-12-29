import getAll from './01-getAll.js'
import findBest from './02-findBest.js'
import rank from './03-rank.js'
import squeeze from './04-squeeze.js'
import format from './05-format.js'

const firstPass = function (pairs) {
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
  let res = format(rules, pairs)
  // console.log(res)
  return res
}
export default firstPass