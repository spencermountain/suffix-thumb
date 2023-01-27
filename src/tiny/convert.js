// check rules
const checkRules = function (str, rules = {}) {
  const len = str.length
  let max = str.length - 1 //<= rules.length ? len - 1 : rules.length
  for (let i = max; i >= 1; i -= 1) {
    let suffix = str.substring(len - i, str.length)
    if (rules && rules.hasOwnProperty(suffix) === true) {
      let pre = str.slice(0, len - i)
      let post = rules[suffix]
      return pre + post
    }
  }
  // try a fallback transform
  if (rules.hasOwnProperty('')) {
    return str += rules['']
  }
  return null
}

//sweep-through all suffixes
const convert = function (str = '', model = {}) {
  // check exceptions
  model.exceptions = model.exceptions || {}
  if (model.exceptions.hasOwnProperty(str)) {
    return model.exceptions[str]
  }

  // check forward-only rules
  let out = checkRules(str, model.fwd)
  // check shared rules
  out = out || checkRules(str, model.both)

  return out || str //unchanged
}
export default convert