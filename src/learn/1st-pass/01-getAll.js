const max = 6

const getSuffixes = function (str = '') {
  let list = []
  for (let i = max; i >= 0; i -= 1) {
    if (str.length - 1 <= i) {
      continue
    }
    let n = str.length - i - 1
    let suffix = str.substring(n, n + str.length - 1)
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

export default getAll
