import getSuffix from './lib/getSuffix.js'
import goodEnough from './lib/goodEnough.js'
import convert from './lib/convert.js'

const magenta = str => '\x1b[35m' + str + '\x1b[0m'
const yellow = str => '\x1b[33m' + str + '\x1b[0m'

const goodPairs = function (remain, pairs) {
  let todo = new Set()
  remain.forEach(arr => todo.add(arr[0]))
  return pairs.filter(arr => !todo.has(arr[0]))
}

const isPerfect = function (goodOnes, rule) {
  return goodOnes.every(pair => convert(pair[0], rule) !== pair[1])
}


const findRules = function (remain, pairs, threshold) {
  let rules = {}
  let ex = {}
  // ensure pairs are prefix aligned, in the first-place
  remain = remain.filter(arr => {
    let [a, b] = arr
    if (a.substring(0, 1) !== b.substring(0, 1)) {
      ex[a] = b
      return false
    }
    return true
  })
  // greediest rules first
  for (let peek = 0; peek < 6; peek += 1) {
    // console.log(`\n--- #${peek} ---`)
    for (let i = 0; i < remain.length; i += 1) {
      let rule = getSuffix(remain[i], peek)
      if (rule !== null && goodEnough(rule, pairs, threshold)) {
        // ensure this rule does not break any existing pairs
        let goodOnes = goodPairs(remain, pairs)
        if (isPerfect(goodOnes, rule)) {
          rules[rule.from] = rules[rule.from] || rule.to
          // what's left, now?
          remain = remain.filter(pair => convert(pair[0], rule) !== pair[1])
          // console.log(`+${yellow((rule.from || "''").padStart(7))} → ${magenta(rule.to).padEnd(19)} ${remain.length} left`)
        }
      }
    }
  }
  // add any remaining as exceptions
  remain.forEach(p => {
    ex[p[0]] = p[1]
  })
  return { fwd: rules, ex }
}
export default findRules