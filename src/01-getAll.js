const getSuffixes = function (str = '') {
  let list = []
  for (let i = 4; i >= 0; i -= 1) {
    if (str.length - 1 <= i) {
      continue
    }
    let suffix = str.substr(str.length - i - 1, str.length - 1)
    list.push(suffix)
  }
  return list
}

const getAll = function (arr) {
  const suffixes = {}
  arr.forEach((a) => {
    let [from, to] = a
    let fromList = getSuffixes(from)
    fromList.push('') //add a prepend-only option
    fromList.forEach((left) => {
      suffixes[left] = suffixes[left] || {}
      let toList = getSuffixes(to)
      toList.forEach((right) => {
        suffixes[left][right] = suffixes[left][right] || 0
        suffixes[left][right] += 1
      })
    })
  })
  return suffixes
}

module.exports = getAll
