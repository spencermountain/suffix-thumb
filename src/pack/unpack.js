const unpack = function (str) {
  let out = { rules: [], exceptions: {} }
  let [rules, exceptions] = str.split('==')
  // unpack rules
  rules.split(',').forEach(txt => {
    let [a, b] = txt.split('|')
    let len = a.length
    if (len) {
      out.rules[len] = out.rules[len] || {}
      out.rules[len][a] = b
    }
  })
  // clean empties up a bit
  for (let i = 0; i < out.rules.length; i += 1) {
    out.rules[i] = out.rules[i] || {}
  }

  // unpack exceptions
  exceptions.split(',').forEach(txt => {
    let [a, b] = txt.split('|')
    out.exceptions[a] = b
  })
  return out
}
export default unpack