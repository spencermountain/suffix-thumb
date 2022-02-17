const prefix = /^([0-9]+)/
import { indexRules } from '../_lib.js'

const expand = function (key = '', val = '') {
  val = String(val)
  let m = val.match(prefix)
  if (m === null) {
    return [key, val]
  }
  let num = Number(m[1]) || 0
  let pre = key.substring(0, num)
  let full = pre + val.replace(prefix, '')
  return [key, full]
}

const toArray = function (txt) {
  const pipe = /\|/
  return txt.split(/,/).map(str => {
    let a = str.split(pipe)
    return expand(a[0], a[1])
  })
}

const uncompress = function (model = {}) {
  model = Object.assign({}, model)

  // compress fwd rules
  model.rules = toArray(model.rules)
  model.rules = indexRules(model.rules)

  // compress reverse rules
  if (model.rev) {
    model.rev = toArray(model.rev)
    model.rev = indexRules(model.rev)
  }

  // compress exceptions
  model.exceptions = toArray(model.exceptions)
  model.exceptions = model.exceptions.reduce((h, a) => {
    h[a[0]] = a[1]
    return h
  }, {})
  return model
}
export default uncompress

// console.log(expand('fixture', '6ing'))
// console.log(toArray('heard|4'))