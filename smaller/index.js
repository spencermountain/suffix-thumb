import data from '/Users/spencer/mountain/minimum-model/pairs/NNS.js'
import firstPass from './1st-pass/index.js'
import secondPass from './2nd-pass/index.js'

// index rules by last-char
const indexRules = function (rules) {
  let byChar = {}
  rules.forEach((a) => {
    let suff = a[0] || ''
    let char = suff[suff.length - 1] || ''
    byChar[char] = byChar[char] || []
    byChar[char].push(a)
  })
  return byChar
}

const format = function (res) {
  res = {
    rules: res.rules.map(a => a.slice(0, 2)),
    exceptions: res.exceptions.reduce((h, a) => {
      h[a[0]] = a[1]
      return h
    }, {})
  }
  res.rules = indexRules(res.rules)
  return res
}

const learn = function (pairs) {
  let res = firstPass(pairs)
  // console.log(res.rules.length, res.exceptions.length)
  res = secondPass(res, pairs)
  // console.log(res.rules.length, res.exceptions.length)
  // console.dir(res, { depth: 5 })
  return format(res)
}
export default learn
// console.log(res)
// console.log(learn(data))