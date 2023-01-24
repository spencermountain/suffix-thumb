import diff from '../_diff.js'
import convert from '../convert.js'

const isSafe = function (rule, pairs) {
  return pairs.every(a => {
    let [from, to] = a
    if (from.endsWith(rule.from)) {
      let w = from.substring(0, from.length - rule.from.length)
      w += rule.to
      if (w !== to) {
        return false
      }
    }
    return true
  })
}

// find first completely safe rule
const firstSafe = function (a, b, pairs) {
  for (let i = 0; i < 5; i += 1) {
    let rule = diff(a, b, i)
    let ok = isSafe(rule, pairs)
    if (ok) {
      // console.log('✅', rule)
      return rule
    }
    // console.log('❌', rule)
  }
  return null
}
export default firstSafe
