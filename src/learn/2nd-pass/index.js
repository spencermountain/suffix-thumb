import shrink from './01-redundancy.js'
import toRules from './02-toRules.js'

const secondPass = function (res, pairs) {
  // remove redundant exceptions
  res = shrink(res)
  // turn some exceptions into singleton suffix-rules
  res = toRules(res, pairs)
  return res
}
export default secondPass
