import keyVal from './key-val.js'

const packObj = function (obj) {
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
    bkwd: packObj(model.bkwd),
  }
  if (model.ex) {
    out.ex = packObj(model.ex)
  }
  return JSON.stringify(out)
}
export default pack
