import { pack, unpack } from 'efrt'
import pressObj from './pressObj.js'
import { unIndex } from '../_lib.js'

const toObj = (rules) => {
  return rules.reduce((h, a) => {
    h[a[0]] = a[1]
    return h
  }, {})
}

const packRules = function (rules) {
  rules = unIndex(rules)
  rules = toObj(rules)
  rules = pressObj(rules)
  rules = pack(rules)
  return rules
}

const compress = function (model = {}) {
  model.rules = packRules(model.rules)
  // compress exceptions
  model.exceptions = pressObj(model.exceptions)
  model.exceptions = pack(model.exceptions)
  return model
}
export default compress