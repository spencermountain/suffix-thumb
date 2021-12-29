import shrink from '../2nd-pass/06-shrink.js'
import toRules from './07-toRules.js'

const secondPass = function (res, pairs) {
  // remove redundant exceptions
  res = shrink(res)
  // turn some exceptions into singleton suffix-rules
  res = toRules(res, pairs)
  return res
}
export default secondPass
