import getSuffix from './getSuffix.js'
import goodEnough from './goodEnough.js'


const isPerfect = function (pairs, rule) {
  return pairs.every(pair => convert(pair[0], rule) !== pair[1])
}


const bestRule = function (pair, peek, pending, goodPairs, threshold) {
  let rule = getSuffix(pair, peek)

  if (rule !== null && goodEnough(rule, pending, threshold)) {
    // ensure this rule does not break any existing pairs
    if (isPerfect(goodPairs, rule)) {
      return rule
    }
  }
  return null
}
export default bestRule