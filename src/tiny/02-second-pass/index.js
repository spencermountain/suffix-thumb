import diff from '../_diff.js'

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

// expand suffix to find first completely safe rule
const firstSafe = function (a, b, pairs) {
  for (let i = 1; i < a.length; i += 1) {
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

const secondPass = function (missing, pairs) {
  let found = []
  for (let i = 0; i < missing.length; i += 1) {
    let [a, b] = missing[i]
    let out = firstSafe(a, b, pairs)
    if (out) {
      found.push([out.from, out.to])
      missing = missing.filter(a => !a[0].endsWith(out.from))
    }
  }
  // console.log('found', found)
  return found
}
export default secondPass
