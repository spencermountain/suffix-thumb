
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
  return list.reverse()
}

// sort-by-frequency + percentages
const topkp = function (arr) {
  let obj = {}
  let len = arr.length
  arr.forEach(a => {
    obj[a] = obj[a] || 0
    obj[a] += 1
  })
  let res = Object.keys(obj).map(k => [k, obj[k]])
  res = res.sort((a, b) => (a[1] > b[1] ? -1 : 0))
  return res.map(a => {
    let num = (a[1] / len || 1) * 100;
    let per = Math.round(num * 10) / 10;
    return [a[0], per]
  })
}

const generate = function (list) {
  let all = []
  list.forEach(str => {
    let suff = getSuffixes(str)
    all = all.concat(suff)
  })
  return topkp(all).reduce((h, a) => {
    h[a[0]] = a[1]
    return h
  }, {})
}

let threshold = 0.05
const diff = function (objA, objB) {
  let diffA = {}
  Object.keys(objA).forEach(k => {
    diffA[k] = objA[k] - (objB[k] || 0)
    if (diffA[k] <= threshold) {
      delete diffA[k]
    }
  })
  let diffB = {}
  Object.keys(objB).forEach(k => {
    diffB[k] = objB[k] - (objA[k] || 0)
    if (diffB[k] <= threshold) {
      delete diffB[k]
    }
  })
  return { diffA, diffB }
}
export { diff, generate }