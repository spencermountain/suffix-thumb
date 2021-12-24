import { pack, unpack } from 'efrt'
// import toRules from '../learn/toRules.js'

// longest common prefix
const findOverlap = (from, to) => {
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

// remove redundancies from key-val pairs
const pressObj = function (obj) {
  let res = {}
  Object.keys(obj).forEach((k) => {
    let val = obj[k]
    let prefix = findOverlap(k, val)
    if (prefix.length < 2) {
      res[k] = val
      return
    }
    let out = '.' + prefix.length + val.substr(prefix.length)
    res[k] = out
  })
  // res = pack(res)
  return res
}
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