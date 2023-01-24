
// longest common prefix
const findDiff = (from, to) => {
  let all = []
  for (let i = 0; i < from.length; i += 1) {
    if (from[i] === to[i]) {
      all.push(from[i])
    } else {
      break
    }
  }
  let prefix = all.join('')
  return {
    prefix,
    from: from.replace(prefix, ''),
    to: to.replace(prefix, '')
  }
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

const tiny = function (pairs) {
  let shared = pairs.map(a => findDiff(a[0], a[1]))

  let rules = shared.map(o => `${o.from}|${o.to}`)
  let diffs = topk(rules).map(a => a[0].split('|'))
  // cleanup
  let already = new Set()
  diffs = diffs.filter(a => {
    if (already.has(a[0])) {
      return false
    }
    already.add(a[0])
    return a[0] && a[1]
  })
  return byLen(diffs)
}
export default tiny