import keyVal from './key-val.js'

const packRules = function (rules) {
  let out = ''
  rules.forEach(obj => {
    let r = []
    Object.keys(obj).forEach(k => {
      let val = keyVal(k, obj[k])// compress any shared prefix
      r.push(k + ':' + val + ',')
    })
    out += r.join('')
  })
  return out
}

const pack = function (model) {
  let out = packRules(model.rules)
  out += '=='

  let r = []
  Object.keys(model.exceptions || {}).forEach(k => {
    let val = keyVal(k, model.exceptions[k])// compress any shared prefix
    r.push(k + ':' + val)
  })
  out += r.join(',')

  // pack reversed rules too
  if (model.rev) {
    out += '=='
    out += packRules(model.rev)
  }
  return out
}
export default pack

// rei:ere, erei:are, rrei:nere, arei:3,  herei:are,  lirei:4,   nirei:4, tirei:4,==