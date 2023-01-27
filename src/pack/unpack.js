const prefix = /^([0-9]+)/

const expand = function (key = '', val = '') {
  val = String(val)
  let m = val.match(prefix)
  if (m === null) {
    return val
  }
  let num = Number(m[1]) || 0
  let pre = key.substring(0, num)
  let full = pre + val.replace(prefix, '')
  return full
}

const unpackObj = function (str = '') {
  let obj = {}
  str.split(',').forEach(txt => {
    let [a, b] = txt.split(':')
    obj[a] = expand(a, b)
  })
  return obj
}

const unpack = function (str = '') {
  let model = JSON.parse(str)
  model.fwd = unpackObj(model.fwd)
  model.both = unpackObj(model.both)
  model.bkwd = unpackObj(model.bkwd)
  model.ex = unpackObj(model.ex)
  return model
}
export default unpack