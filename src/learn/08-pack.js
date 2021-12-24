// index rules by last-char
const pressRules = function (rules) {
  let byChar = {}
  rules.forEach((a) => {
    let suff = a[0] || ''
    let char = suff[suff.length - 1] || ''
    byChar[char] = byChar[char] || []
    byChar[char].push(a)
  })
  return byChar
}


const compress = function (model) {
  model.rules = pressRules(model.rules)
  // console.dir(model, { depth: 5 })
  return model
}
export default compress
