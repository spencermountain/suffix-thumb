import produce from './01-getAll.js'
import findBest from './02-findBest.js'
import rank from './03-rank.js'
import squeeze from './04-squeeze.js'
import format from './05-format.js'
import compress from '../compress/index.js'

const find = function (pairs) {
  pairs = pairs.filter((a) => a && a[0] && a[1])
  // look at all patterns
  const suffixes = produce(pairs)
  // look for the greatest patterns
  let best = findBest(suffixes)
  // run pattern against the pairs
  let rules = rank(best, pairs)
  // remove duplicates
  rules = squeeze(rules)
  // nice result format
  return format(rules, pairs)
}

const percent = (part, total) => {
  let num = part / total
  num = Math.round(num * 1000) / 1000
  return num
}

const postProcess = function (res, inputSize) {
  let count = 0
  res.rules = res.rules.map((a) => {
    count += a[2]
    return a.slice(0, 2)
  })
  // convert exceptions to an object
  res.exceptions = res.exceptions.reduce((h, a) => {
    h[a[0]] = a[1]
    return h
  }, {})
  // sort rules results
  res.rules = res.rules.sort((a, b) => {
    if (a[0].length > b[0].length) {
      return -1
    } else if (a[0].length < b[0].length) {
      return 1
    }
    return 0
  })
  res.coverage = percent(count, inputSize)
  return res
}

const wrapper = function (pairs) {
  let inputSize = pairs.length
  let res = {}
  let found = find(pairs)
  res.rules = found.rules || []
  res.exceptions = found.remaining.concat(Object.entries(found.exceptions))
  res = postProcess(res, inputSize)
  res = compress(res)
  return res
}
export default wrapper
