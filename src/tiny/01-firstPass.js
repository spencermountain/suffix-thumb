
import findDiff from './_diff.js'

const topk = function (arr) {
  let obj = {}
  arr.forEach(a => {
    obj[a] = obj[a] || 0
    obj[a] += 1
  })
  let res = Object.keys(obj).map(k => [k, obj[k]])
  return res.sort((a, b) => (a[1] > b[1] ? -1 : 0))
}

const byLen = function (diffs) {
  let arr = []
  diffs.forEach(a => {
    let len = a[0].length
    arr[len] = arr[len] || {}
    arr[len][a[0]] = a[1]
  })
  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = arr[i] || {}
  }
  return arr
}

const generate = function (pairs, peek = 0) {
  let shared = pairs.map(a => findDiff(a[0], a[1], peek))

  let transform = shared.map(o => `${o.from}|${o.to}`)
  let diffs = topk(transform).map(a => a[0].split('|'))
  // console.log(diffs)
  let fallback = null
  // cleanup
  let already = new Set()
  diffs = diffs.filter(a => {
    if (already.has(a[0])) {
      return false
    }
    already.add(a[0])
    if (!a[0] || !a[1]) {
      fallback = a
    }
    return a[0] && a[1]
  })
  let rules = byLen(diffs)
  return { rules, fallback }
}
export default generate