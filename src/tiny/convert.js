
//sweep-through all suffixes
const convert = function (str = '', found = {}) {
  // check exceptions
  found.exceptions = found.exceptions || {}
  if (found.exceptions.hasOwnProperty(str)) {
    return found.exceptions[str]
  }

  // check rules
  let rules = found.rules || []
  const len = str.length
  let max = len <= rules.length ? len - 1 : rules.length
  for (let i = max; i >= 1; i -= 1) {
    let suffix = str.substring(len - i, str.length)
    if (rules[suffix.length] && rules[suffix.length].hasOwnProperty(suffix) === true) {
      let pre = str.slice(0, len - i)
      let post = rules[suffix.length][suffix]
      return pre + post
    }
  }

  return str //unchanged
}
export default convert