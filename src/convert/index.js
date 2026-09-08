// apply a model to one word:
//   1. whole-word exceptions
//   2. the longest suffix with a rule (a rule may match the entire word)
//   3. the '' rule, if any, as a fallback (a plain append)
//   4. otherwise, the word is returned unchanged
const convert = function (str = '', model = {}) {
  let { ex = {}, fwd = {}, both = {} } = model
  if (ex.hasOwnProperty(str)) {
    return ex[str]
  }
  for (let len = str.length; len >= 0; len -= 1) {
    let suff = str.slice(str.length - len)
    let stem = str.slice(0, str.length - len)
    if (fwd.hasOwnProperty(suff)) {
      return stem + fwd[suff]
    }
    if (both.hasOwnProperty(suff)) {
      return stem + both[suff]
    }
  }
  return str
}
export default convert
