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

const unpack = function (str) {
  let out = { rules: [], exceptions: {} }
  let [rules, exceptions] = str.split('==')
  // unpack rules
  rules.split(',').forEach(txt => {
    let [a, b] = txt.split(':')
    let len = a.length
    if (len) {
      out.rules[len] = out.rules[len] || {}
      out.rules[len][a] = expand(a, b)
    }
  })
  // clean empties up a bit
  for (let i = 0; i < out.rules.length; i += 1) {
    out.rules[i] = out.rules[i] || {}
  }

  // unpack exceptions
  exceptions.split(',').forEach(txt => {
    let [a, b] = txt.split(':')
    out.exceptions[a] = expand(a, b)
  })
  return out
}
export default unpack