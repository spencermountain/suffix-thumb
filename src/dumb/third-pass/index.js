import getScore from '../getScore.js'
import pack from './pack.js'


const format = function (pairs, res) {
  let { score, wrong } = getScore(pairs, res)
  res.ex = pack(wrong)
  res.rules = pack(res.rules)
  console.log(res)
  return res
}
export default format