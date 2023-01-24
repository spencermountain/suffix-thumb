// check rules
const checkRules = function (str, rules = []) {
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
  return null
}

//sweep-through all suffixes
const convert = function (str = '', found = {}) {
  // check exceptions
  found.exceptions = found.exceptions || {}
  if (found.exceptions.hasOwnProperty(str)) {
    return found.exceptions[str]
  }

  if (found.reversed) {
    let out = checkRules(str, found.rev)
    if (out) {
      return out
    }
  }

  // check normal rules
  let out = checkRules(str, found.rules)
  if (out) {
    return out
  }

  return str //unchanged
}
export default convert