const pressRules = function (rules) {
  let byChar = {}
  rules.forEach((a) => {
    let suff = a[0] || ''
    let char = suff[suff.length - 1] || ''
    byChar[char] = byChar[char] || []
    byChar[char].push(a)
  })
  return byChar
}

const overlap = (from, to) => {
  let all = []
  for (let i = 0; i < from.length; i += 1) {
    if (from[i] === to[i]) {
      all.push(from[i])
    } else {
      break
    }
  }
  return all.join('')
}

const pressObj = function (obj) {
  let res = {}
  Object.keys(obj).forEach((k) => {
    let val = obj[k]
    let prefix = overlap(k, val)
    if (prefix.length < 2) {
      res[k] = val
      return
    }
    let out = '.' + prefix.length + val.substr(prefix.length)
    res[k] = out
  })
  return res
}

const compress = function (model) {
  model.rules = pressRules(model.rules)
  model.exceptions = pressObj(model.exceptions)
  return model
}
export default compress
