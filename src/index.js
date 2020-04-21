const produce = require('./01-getAll')
const findBest = require('./02-findBest')
const rank = require('./03-rank')
const compress = require('./04-compress')
const format = require('./05-format')

const thumb = function (pairs) {
  // look at all patterns
  const suffixes = produce(pairs)
  // look for the greatest patterns
  let best = findBest(suffixes)
  // run pattern against the pairs
  let rules = rank(best, pairs)
  // remove duplicates
  rules = compress(rules)
  // nice result format
  return format(rules, pairs)
}
module.exports = thumb
