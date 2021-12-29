// index rules by last-char
const indexRules = function (rules) {
  let byChar = {}
  rules.forEach((a) => {
    let suff = a[0] || ''
    let char = suff[suff.length - 1] || ''
    byChar[char] = byChar[char] || []
    byChar[char].push(a)
  })
  return byChar
}

const unIndex = function (byChar) {
  let arr = []
  Object.keys(byChar).forEach(k => {
    arr = arr.concat(byChar[k])
  })
  return arr
}

export {
  indexRules, unIndex
}