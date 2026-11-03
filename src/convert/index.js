// apply a model to one word:
//   1. whole-word exceptions
//   2. the longest suffix with a rule (a rule may match the entire word)
//   3. the '' rule, if any, as a fallback (a plain append)
//   4. otherwise, the word is returned unchanged
const convert = function (str = '', model = {}) {
  if (typeof model === 'string') {
    throw new Error('suffix-thumb: convert expects a model - uncompress() a packed string first')
  }
  const { ex = {}, fwd = {}, both = {} } = model
  if (Object.hasOwn(ex, str)) {
    return ex[str]
  }
  // longest suffix first - the stem is only cut once a rule matches
  for (let i = 0; i <= str.length; i += 1) {
    const suff = str.slice(i)
    if (Object.hasOwn(fwd, suff)) {
      return str.slice(0, i) + fwd[suff]
    }
    if (Object.hasOwn(both, suff)) {
      return str.slice(0, i) + both[suff]
    }
  }
  return str
}
export default convert
