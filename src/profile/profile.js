const max = 6

const getSuffixes = function (str = '') {
  let list = []
  for (let i = max; i >= 1; i -= 1) {
    if (str.length - 1 <= i) {
      continue
    }
    let n = str.length - i - 1
    let suffix = str.substring(n, n + str.length - 1)
    list.push(suffix)
  }
  return list
}

const getProfile = function (arr) {
  let count = {}
  arr.forEach(str => {
    let suff = getSuffixes(str)
    suff.forEach(s => {
      count[s] = count[s] || 0
      count[s] += 1
    })
  })
  // turn into array
  let res = Object.keys(count).map(k => [k, count[k]])
  // remove lame ones
  res = res.filter(a => a[1] > 1)
  // sort by most common
  res = res.sort((a, b) => (a[1] > b[1] ? -1 : 0))
  // turn them into percentages
  res = res.map(a => {
    a[1] = (a[1] / arr.length) * 100
    a[1] = Math.round(a[1] * 10) / 10
    return a
  })
  return res
}
export default getProfile