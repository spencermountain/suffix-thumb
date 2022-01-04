import { unpack } from 'efrt'
import { indexRules, sortRules } from '../_lib.js'
const prefix = /^.([0-9]+)/

const unEncode = function (obj) {
  Object.keys(obj).forEach(k => {
    let val = obj[k]
    let m = val.match(prefix)
    if (m !== null) {
      let num = Number(m[1]) || 0
      let pre = k.substring(0, num)
      let full = pre + val.replace(prefix, '')
      obj[k] = full
    }
  })
  return obj
}

const unpackRules = function (rules) {
  if (!rules) {
    return {}
  }
  // un-do our trie compression
  rules = unpack(rules)
  // un-do our run-length encoding
  rules = unEncode(rules)
  // turn into an array
  rules = Object.entries(rules)
  // ensure they are longest-first order
  rules = sortRules(rules)
  // index by end-char
  rules = indexRules(rules)
  return rules
}


const uncompress = function (model = {}) {
  if (typeof model.exceptions === 'string') {
    model.exceptions = unpack(model.exceptions)
    model.exceptions = unEncode(model.exceptions)
  }
  if (typeof model.rules === 'string') {
    model.rules = unpackRules(model.rules)
  }
  return model
}
export default uncompress