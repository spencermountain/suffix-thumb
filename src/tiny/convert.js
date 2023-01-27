// check rules
const checkRules = function (str, rules = {}) {
  const len = str.length
  let max = len - 1
  // look for a matching suffix
  for (let i = max; i >= 1; i -= 1) {
    let suffix = str.substring(len - i, str.length)
    if (rules.hasOwnProperty(suffix) === true) {
      let pre = str.slice(0, len - i)
      return pre + rules[suffix]
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
  model.ex = model.ex || {}
  if (model.ex.hasOwnProperty(str)) {
    return model.ex[str]
  }
  // check forward-only rules
  let out = checkRules(str, model.fwd)
  // check shared rules
  out = out || checkRules(str, model.both)
  return out || str //unchanged
}
export default convert