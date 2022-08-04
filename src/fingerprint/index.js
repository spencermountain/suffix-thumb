import { diff, generate, } from './diff.js'
import score from './score.js'


const rank = function (obj) {
  return Object.entries(obj).sort((a, b) => {
    if (a[1] > b[1]) {
      return -1
    } else if (a[1] < b[1]) {
      return 1
    }
    return 0
  })
}
const noRedundant = function (arr) {
  for (let i = 0; i < arr.length; i += 1) {
    for (let o = i + 1; o < arr.length; o += 1) {
      if (arr[o] && arr[i] && arr[o][0].endsWith(arr[i][0])) {
        arr[o] = null
      }
    }
  }
  return arr.filter(a => a)
}

const fmt = function (diffA, diffB) {
  let res = {}
  diffA.forEach(a => {
    res[a[0]] = res[a[0]] || 'a'
  })
  diffB.forEach(a => {
    res[a[0]] = res[a[0]] || 'b'
  })
  let out = [null]
  Object.keys(res).forEach(k => {
    let len = k.length
    out[len] = out[len] || {}
    out[len][k] = res[k]
  })
  return out
}

const fingerPrint = function (listA, listB) {
  let suffA = generate(listA)
  let suffB = generate(listB)
  let { diffA, diffB } = diff(suffA, suffB)
  diffA = rank(diffA)
  diffB = rank(diffB)

  diffA = noRedundant(diffA)
  diffB = noRedundant(diffB)

  let rules = fmt(diffA, diffB)
  score(listA, listB, rules)
  return rules
}
export default fingerPrint