import getBest from './get-best.js'
import getScore from './getScore.js'


const topk = function (arr) {
  let obj = {}
  arr.forEach(a => {
    obj[a] = obj[a] || 0
    obj[a] += 1
  })
  let res = Object.keys(obj).map(k => [k, obj[k]])
  return res.sort((a, b) => (a[1] > b[1] ? -1 : 0))
}

const byPattern = function (wrong, size) {
  let suffixes = wrong.map(a => {
    return a[0].substring(a[0].length - size, a[0].length)
  })
  let ends = topk(suffixes).slice(0, 5).map(a => a[0])
  return ends.map(suff => {
    return {
      suff,
      list: wrong.filter(a => a[0].endsWith(suff))
    }
  })
}

const dumb = function (pairs) {
  let res = { fallback: getBest(pairs), rules: [] }
  let { score, wrong } = getScore(pairs, res)
  console.log(`${score}%   ${res.rules.length}`)
  for (let size = 2; size < 6; size += 1) {
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
        console.log(`❌ ${s.score}%   -  ${rule.join(' → ')}`)
      }
    })
  }
  res.rules = res.rules.reverse()
  let s = getScore(pairs, res)
  console.log(res)
  console.log(`${s.score}%   `)

  // console.log(getScore(pairs, res).score)

}
export default dumb