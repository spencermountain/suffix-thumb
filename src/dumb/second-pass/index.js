/* eslint-disable no-console */
import getScore from '../getScore.js'

const clipAndDiff = function (a, b, n) {
  let shrtr = a.substring(0, a.length - n)
  let clip = a.substring(a.length - n)
  let to = b.substring(shrtr.length)
  return [clip, to]
}

const topk = function (arr) {
  let obj = {}
  arr.forEach(a => {
    obj[a] = obj[a] || 0
    obj[a] += 1
  })
  let res = Object.keys(obj).map(k => [k, obj[k]])
  return res.sort((a, b) => (a[1] > b[1] ? -1 : 0))
}

const tryRules = function (rules, pairs, res, score) {
  let scoreNow = 0
  // evaluate each one
  rules.forEach(rule => {
    // try it out
    let tmp = Object.assign({}, res)
    tmp.rules = tmp.rules.slice(0)
    tmp.rules.push(rule)
    scoreNow = getScore(pairs, tmp).score
    // accept the new rule
    if (scoreNow > score) {
      console.log(`✔  ${scoreNow}%   -  ${rule.join(' → ')}`)
      res.rules.push(rule)
    }
  })
}

const clipByN = function (pairs, res, n) {
  let { score, wrong } = getScore(pairs, res)
  let rules = []
  wrong.forEach(a => {
    let rule = clipAndDiff(a[0], a[1], n)
    rules.push(rule.join('|'))
  })
  rules = topk(rules).map(a => a[0].split('|'))
  tryRules(rules, pairs, res, score)
  return score
}

const secondPass = function (pairs, res) {
  for (let i = 0; i <= 4; i += 1) {
    let score = clipByN(pairs, res, i)
    if (score >= 100) {
      break
    }
    // console.log(i, score)
  }
  // console.log(`${scoreNow}%   2nd-pass`)

  return res
}
export default secondPass

// console.log(clipBy('encourage', 1))