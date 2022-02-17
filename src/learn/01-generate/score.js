import { replace } from '../lib.js'
// const revCount = function (rule, pairs) {
//   let no = 0
//   pairs.forEach(pair => {
//     let [left, right] = pair
//     let reg = new RegExp(rule[1] + '$')
//     if (!right.match(reg)) {
//       return
//     }
//     let res = right.replace(reg, rule[0])
//     if (res !== left) {
//       no += 1
//     }
//   })
//   return no
// }

const getCounts = function (rule, pairs) {
  let yes = 0
  let no = 0
  pairs.forEach(pair => {
    let [left, right] = pair
    if (!rule.reg.test(left)) {
      return
    }
    // console.log(replace(left, rule.from, rule.to), left.replace(rule.reg, rule.to))
    if (replace(left, rule.from, rule.to) === right) {
      // if (left.replace(rule.reg, rule.to) === right) {
      yes += 1
    } else {
      no += 1
    }
  })
  return { yes, no }
}

const score = function (rules, pairs, opts = {}) {
  rules = rules.map(rule => {
    let { yes, no } = getCounts(rule, pairs)
    rule.yes = yes
    rule.no = no
    delete rule.id
    return rule
  })
  // worst-to-best
  rules = rules.sort((a, b) => {
    if (a.yes > b.yes) {
      return 1
    } else if (a.yes < b.yes) {
      return -1
    }
    return 0
  })
  return rules
}
export default score