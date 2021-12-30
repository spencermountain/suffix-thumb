import shrink from './01-redundancy.js'
import toRules from './02-toRules.js'
import addInverse from './addInverse.js'

const secondPass = function (res, pairs, opts) {
  // remove redundant exceptions
  res = shrink(res)
  // turn some exceptions into singleton suffix-rules
  // res = toRules(res, pairs)

  if (opts.inverse !== false) {
    res = addInverse(res, pairs)
  }
  return res
}
export default secondPass
