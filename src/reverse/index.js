const reverseObj = function (obj) {
  return Object.entries(obj).reduce((h, a) => {
    h[a[1]] = a[0]
    return h
  }, {})
}

const fmtRules = function (obj) {
  let rules = []
  Object.keys(obj).forEach(k => {
    let len = k.length
    rules[len] = rules[len] || {}
    rules[len][k] = obj[k]
  })
  // clean empties up a bit
  for (let i = 0; i < rules.length; i += 1) {
    rules[i] = rules[i] || {}
  }
  return rules
}

const reverse = function (model) {
  let { rules, exceptions, rev } = model
  exceptions = reverseObj(exceptions)

  let allRules = {}
  rules.forEach(o => {
    Object.keys(o).forEach(k => {
      allRules[k] = o[k]
    })
  })
  allRules = reverseObj(allRules)
  rules = fmtRules(allRules)
  return {
    reversed: !Boolean(model.reversed),//toggle this
    rules,
    exceptions,
    rev
  }
}
export default reverse