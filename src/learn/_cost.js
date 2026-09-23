import { encodeVal } from '../compress/_lib.js'

// estimated byte-cost of one `key → val` entry, once packed
const cost = function (key, val) {
  return key.length + encodeVal(key, val).length + 2 // separators
}
export default cost
