const getDiff = function (a, b) {
  return b.substring(a.length)
}

const topk = function (arr) {
  let obj = {}
  arr.forEach(a => {
    obj[a] = obj[a] || 0
    obj[a] += 1
  })
  let res = Object.keys(obj).map(k => [k, obj[k]])
  return res.sort((a, b) => (a[1] > b[1] ? -1 : 0))
}

const getBest = function (pairs) {
  let diffs = pairs.map(a => getDiff(a[0], a[1]))
  let tops = topk(diffs).map(a => a[0])//.slice(0, 20)
  console.log(tops)
  return tops[0]
}
export default getBest
