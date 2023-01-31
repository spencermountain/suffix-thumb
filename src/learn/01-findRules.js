import getSuffix from './lib/getSuffix.js'
import goodEnough from './lib/goodEnough.js'
import convert from './lib/convert.js'

const magenta = str => '\x1b[35m' + str + '\x1b[0m'
const yellow = str => '\x1b[33m' + str + '\x1b[0m'

const findRules = function (remain, pairs, threshold) {
  let rules = {}
  // greediest rules first
  for (let peek = 0; peek < 6; peek += 1) {
    // console.log(`\n--- #${peek} ---`)
    for (let i = 0; i < remain.length; i += 1) {
      let rule = getSuffix(remain[i], peek)
      if (rule !== null && goodEnough(rule, pairs, threshold)) {
        rules[rule.from] = rules[rule.from] || rule.to
        // what's left, now?
        remain = remain.filter(pair => convert(pair[0], rule) !== pair[1])
        // console.log(`+${yellow((rule.from || "''").padStart(7))} → ${magenta(rule.to).padEnd(19)} ${remain.length} left`)
      }
    }
  }
  // add any remaining as exceptions
  let ex = {}
  remain.forEach(p => {
    ex[p[0]] = p[1]
  })
  return { fwd: rules, ex }
}
export default findRules