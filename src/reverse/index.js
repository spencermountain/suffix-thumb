import { sortRules, indexRules } from '../_lib.js'

const reverseObj = function (obj) {
  return Object.entries(obj).reduce((h, a) => {
    h[a[1]] = a[0]
    return h
  }, {})
}

const reverseArr = function (arr) {
  return arr.map(a => [a[1], a[0]])
}

const reverse = function (model) {
  let allRules = []
  let { rules, exceptions, rev } = model
  Object.keys(rules).forEach(k => {
    allRules = allRules.concat(reverseArr(rules[k]))
  })
  allRules = sortRules(allRules)
  rules = indexRules(allRules)
  exceptions = reverseObj(exceptions)
  return {
    reversed: !Boolean(model.reversed),//toggle this
    rules,
    exceptions,
    rev
  }
}
export default reverse