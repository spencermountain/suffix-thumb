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

export default packObj
