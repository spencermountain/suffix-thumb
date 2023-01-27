import findDiff from '../_diff.js'

const topk = function (arr) {
  let obj = {}
  arr.forEach(a => {
    obj[a] = obj[a] || 0
    obj[a] += 1
  })
  let res = Object.keys(obj).map(k => [k, obj[k]])
  return res.sort((a, b) => (a[1] > b[1] ? -1 : 0))
}

const generate = function (pairs, peek = 0) {
  let shared = pairs.map(a => findDiff(a[0], a[1], peek))

  let transform = shared.map(o => `${o.from}|${o.to}`)
  let diffs = topk(transform).map(a => a[0].split('|'))
  // cleanup
  let already = new Set()
  diffs = diffs.filter(a => {
    if (already.has(a[0])) {
      return false
    }
    already.add(a[0])
    return true
  })
  // let rules = byLen(diffs)
  return diffs
}
export default generate