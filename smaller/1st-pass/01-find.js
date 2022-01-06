
const getPrefix = function (left, right) {
  left = left.split('')
  right = right.split('')
  let found = []
  for (let i = 0; i < left.length; i += 1) {
    if (left[i] === right[i]) {
      found.push(left[i])
    } else {
      break
    }
  }
  return found.join('')
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

const getBestDiff = function (left, right) {
  let prefix = getPrefix(left, right)
  let reg = escapeRegExp(prefix)
  reg = new RegExp('^' + reg)
  left = left.replace(reg, '')
  right = right.replace(reg, '')
  return {
    reg: reg,
    left,
    right,
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

const findBest = function (pairs, already) {
  let subs = pairs.map(a => {
    let res = getBestDiff(a[0], a[1])
    return `${res.left}|${res.right}`
  })
  let res = topk(subs)
  res = res.map(a => {
    let split = a[0].split('\|')
    let left = split[0] || ''
    let right = split[1] || ''
    return { left, right, yes: a[1] }
  })
  // remove unchanged ones, for now
  res = res.filter(o => o.left)
  // remove any suffixes we've already used
  res = res.filter(o => !already.has(o.left))
  return res
}
export default findBest