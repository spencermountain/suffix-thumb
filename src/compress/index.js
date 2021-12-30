import { pack, unpack } from 'efrt'
import pressObj from './pressObj.js'
// import toRules from '../learn/toRules.js'


const toObj = (rules) => {
  let obj = {}
  Object.keys(rules).forEach(k => {
    rules[k].forEach(a => {
      obj[a[0]] = a[1]
    })
  })
  return obj
}

const compress = function (model = {}) {
  // let ruleObj = toObj(model.rules)
  // console.log(ruleObj)
  // model.rules = pressObj(ruleObj)
  // model.rules = pack(model.rules)
  // console.log(unpack(model.rules))
  // compress exceptions
  model.exceptions = pressObj(model.exceptions)
  model.exceptions = pack(model.exceptions)
  return model
}
export default compress