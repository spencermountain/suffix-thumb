import firstPass from './1st-pass/index.js'
import secondPass from './2nd-pass/index.js'
import { indexRules } from '../_lib.js'

// make sure inputs are not impossible to square-up
const checkDupes = function (arr) {
  let left = {}
  arr = arr.filter(a => {
    if (left[a[0]] !== undefined) {
      console.warn('Duplicate input issue:')
      console.log('  1.', [a[0], left[a[0]]])
      console.log('  2.', a)
      return false
    }
    left[a[0]] = a[1]
    return true
  })
  return arr
}


const learn = function (pairs, opts = {}) {
  pairs = checkDupes(pairs)
  // create basic {rules, exceptions}
  let res = firstPass(pairs)
  // optimize it further
  res = secondPass(res, pairs, opts)
  // organize rules by their suffix char
  res.rules = indexRules(res.rules)
  return res
}
export default learn