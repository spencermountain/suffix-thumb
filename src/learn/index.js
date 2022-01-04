import firstPass from './1st-pass/index.js'
import secondPass from './2nd-pass/index.js'
import { indexRules } from '../_lib.js'
import validate from './validate.js'

const learn = function (pairs, opts = {}) {
  // ensure input pairs are possible
  pairs = validate(pairs, opts)
  // create basic {rules, exceptions}
  let res = firstPass(pairs)
  // optimize it further
  res = secondPass(res, pairs, opts)
  // organize rules by their suffix char
  res.rules = indexRules(res.rules)
  return res
}
export default learn