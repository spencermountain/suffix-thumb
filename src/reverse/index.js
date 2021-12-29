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
  Object.keys(model.rules).forEach(k => {
    allRules = allRules.concat(reverseArr(model.rules[k]))
  })
  allRules = sortRules(allRules)
  let rules = indexRules(allRules)
  let exceptions = reverseObj(model.exceptions)
  return {
    rules,
    exceptions
  }
}
export default reverse