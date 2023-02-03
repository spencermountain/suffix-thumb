import keyVal from './key-val.js'
import { pack } from 'efrt'

const packObj = function (obj = {}) {
  let tmp = {}
  Object.keys(obj).forEach(k => {
    let val = keyVal(k, obj[k])// compress any shared prefix
    tmp[k] = val
  })
  return pack(tmp)
}

const compress = function (model) {
  let out = {
    fwd: packObj(model.fwd),
    both: packObj(model.both),
    rev: packObj(model.rev),
    ex: packObj(model.ex),
  }
  return out
}
export default compress
