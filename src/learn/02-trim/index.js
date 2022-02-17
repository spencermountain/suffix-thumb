import { replace } from '../lib.js'

const trimPairs = function (pairs, rule) {
  let { reg, from, to } = rule
  let done = []
  let remain = pairs.filter(pair => {
    let [left, right] = pair
    if (left.match(reg)) {
      if (replace(left, rule.from, rule.to) === right) {
        // if (left.replace(reg, to) === right) {
        done.push(pair)
        return false //done with it
      }
    }
    return true // keep it
  })
  return { remain, done }
}

// remove any rules that challenge existing pairs
const trimRules = function (rules, pairsDone) {
  return rules.filter(r => {
    for (let i = 0; i < pairsDone.length; i += 1) {
      let pair = pairsDone[i]
      let res = replace(pair[0], r.from, r.to)
      if (res !== pair[0] && res !== pair[1]) {
        return false
      }
    }
    return true
  })
}

export { trimRules, trimPairs }