const pack = function (model) {
  let out = ''
  model.rules.forEach(obj => {
    let r = []
    Object.keys(obj).forEach(k => {
      r.push(k + '|' + obj[k] + ',')
    })
    out += r.join('')
  })
  out += '=='
  let r = []
  Object.keys(model.exceptions).forEach(k => {
    r.push(k + '|' + model.exceptions[k])
  })
  out += r.join(',')
  return out
}
export default pack