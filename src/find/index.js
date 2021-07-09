const produce = require('./01-getAll')
const findBest = require('./02-findBest')
const rank = require('./03-rank')
const compress = require('./04-compress')
const format = require('./05-format')

const thumb = function (pairs) {
  pairs = pairs.filter((a) => a && a[0] && a[1])
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

const percent = (part, total) => {
  let num = part / total
  num = Math.round(num * 10) / 10
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
      return 1
    } else if (a[0].length < b[0].length) {
      return -1
    }
    return 0
  })
  res.coverage = percent(count, inputSize)
  return res
}

const wrapper = function (pairs) {
  let inputSize = pairs.length
  let res = {
    rules: [],
    exceptions: [],
  }
  let found
  // for (let i = 0; i < 2; i += 1) {
  found = thumb(pairs)
  res.rules = res.rules.concat(found.rules)
  pairs = found.remaining.concat(Object.entries(found.exceptions))
  // pairs.forEach((pair) => {
  //   if (pair[0] === 'abolir') {
  //     console.log(i, pair)
  //   }
  // })
  // if (found.rules.length === 0) {
  //   break
  // }
  // }
  res.exceptions = found.remaining.concat(Object.entries(found.exceptions))
  res = postProcess(res, inputSize)
  return res
}
module.exports = wrapper