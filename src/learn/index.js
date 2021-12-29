import firstPass from './1st-pass/index.js'
import secondPass from './2nd-pass/index.js'
import { indexRules } from '../_lib.js'

const checkDupes = function (arr) {
  let obj = {}
  arr = arr.filter(a => {
    if (obj[a[0]] !== undefined) {
      console.warn('Duplicate input issue:')
      console.log('  1.', [a[0], obj[a[0]]])
      console.log('  2.', a)
      return false
    }
    obj[a[0]] = a[1]
    return true
  })
  return arr
}


const learn = function (pairs) {
  pairs = checkDupes(pairs)
  // create basic {rules, exceptions}
  let res = firstPass(pairs)
  // optimize it further
  res = secondPass(res, pairs)
  // organize rules by their suffix char
  res.rules = indexRules(res.rules)
  return res
}
export default learn