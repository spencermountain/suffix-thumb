import substr from '../_substr.js'

// line-up "abcdfoo" with "zzabcdbar"
const align = function (arr) {
  let [a, b] = arr
  let res = substr(a, b)
  // clip left side
  a = a.substring(res.offset)
  // clip right side
  for (let i = 0; i < b.length; i += 1) {
    if (b.startsWith(res.sequence)) {
      break
    }
    b = b.substring(1)
  }
  return [a, b]
}
export default align