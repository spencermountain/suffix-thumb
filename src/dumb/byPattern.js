const topk = function (arr) {
  let obj = {}
  arr.forEach(a => {
    obj[a] = obj[a] || 0
    obj[a] += 1
  })
  let res = Object.keys(obj).map(k => [k, obj[k]])
  return res.sort((a, b) => (a[1] > b[1] ? -1 : 0))
}

const byPattern = function (wrong, size) {
  let suffixes = wrong.map(a => {
    return a[0].substring(a[0].length - size, a[0].length)
  })
  let ends = topk(suffixes).map(a => a[0])//.slice(0, 25)
  return ends.map(suff => {
    return {
      suff,
      list: wrong.filter(a => a[0].endsWith(suff))
    }
  })
}

export default byPattern