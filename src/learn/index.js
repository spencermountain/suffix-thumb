import firstPass from './1st-pass/index.js'
import secondPass from './2nd-pass/index.js'
import { indexRules } from '../_lib.js'

const learn = function (pairs) {
  // -- first-pass--
  // {rules:[], exceptions:{}}
  let res = firstPass(pairs)
  res.rules = indexRules(res.rules)
  // res = secondPass(res, pairs)
  return res
}
export default learn