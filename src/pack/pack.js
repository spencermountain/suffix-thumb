import keyVal from './key-val.js'

const packObj = function (obj = {}) {
  let r = []
  Object.keys(obj).forEach(k => {
    let val = keyVal(k, obj[k])// compress any shared prefix
    r.push(k + ':' + val)
  })
  return r.join(',')
}

const pack = function (model) {
  let out = {
    fwd: packObj(model.fwd),
    both: packObj(model.both),
    rev: packObj(model.rev),
    ex: packObj(model.ex),
    same: (model.same || []).join(',')
  }
  return JSON.stringify(out)
}
export default pack
