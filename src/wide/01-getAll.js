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

const getDiff = function (left, right, suff) {
  suff = suff.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
  let reg = new RegExp(suff + '$')
  let stem = left.replace(reg, '')
  if (!right.startsWith(stem)) {
    return
  }
  stem = stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  reg = new RegExp('^' + stem)
  let rest = right.replace(reg, '')
  return [suff, rest]
}

const unique = function (arr) {
  let set = new Set()
  return arr.filter(a => {
    let id = `${a[0]}|${a[1]}`
    if (set.has(id)) {
      return false
    }
    set.add(id)
    return true
  })
}

const getAll = function (arr) {
  let res = []
  arr.forEach((a) => {
    let [left, right] = a
    let list = getSuffixes(left)
    list.forEach(suff => {
      let diff = getDiff(left, right, suff)
      if (diff) {
        res.push(diff)
      }
    })
  })
  res = unique(res)
  return res
}

export default getAll


// console.log(getAll([['laughed', 'laughing']]))