import keyVal from './key-val.js'

const pack = function (model) {
  let out = ''
  model.rules.forEach(obj => {
    let r = []
    Object.keys(obj).forEach(k => {
      let val = keyVal(k, obj[k])// compress any shared prefix
      if (!val) {
        console.log('=-=-=-= here -=-=-=-')
        console.log(k, obj[k])
      }
      r.push(k + ':' + val + ',')
    })
    out += r.join('')
  })
  out += '=='
  let r = []
  Object.keys(model.exceptions || {}).forEach(k => {
    let val = keyVal(k, model.exceptions[k])// compress any shared prefix
    r.push(k + ':' + val)
  })
  out += r.join(',')
  return out
}
export default pack

// rei:ere, erei:are, rrei:nere, arei:3,  herei:are,  lirei:4,   nirei:4, tirei:4,==