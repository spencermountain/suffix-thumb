/* eslint-disable no-console */
import getBest from './get-best.js'
import getScore from '../getScore.js'
import byPattern from '../byPattern.js'


const firstPass = function (pairs) {
  let res = { fallback: getBest(pairs), rules: [] }
  let { score, wrong } = getScore(pairs, res)
  console.log(`${score}%   ${res.rules.length}`)
  for (let size = 1; size <= 5; size += 1) {
    let kinds = byPattern(wrong, size)
    kinds.forEach(obj => {
      let to = getBest(obj.list)
      let rule = [obj.suff, obj.suff + to]
      let tmp = { fallback: res.fallback, rules: [rule].concat(res.rules) }
      let s = getScore(pairs, tmp)
      if (s.score > score) {
        score = s.score
        res.rules.push(rule)
        console.log(`✅ ${s.score}%   -  ${rule.join(' → ')}`)
      } else {
        // console.log(`❌ ${s.score}%   -  ${rule.join(' → ')}`)
      }
    })
  }
  res.rules = res.rules.reverse()
  let s = getScore(pairs, res)
  // console.log(res)
  // console.log(`${s.score}%   first-pass`)
  // console.log(s.wrong)
  return res

  // console.log(getScore(pairs, res).score)

}
export default firstPass