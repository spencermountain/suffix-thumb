const topChange = function (obj, from) {
  let keys = Object.keys(obj)
  let arr = keys.map((to) => {
    return {
      from: from,
      to: to,
      yes: obj[to],
    }
  })
  arr = arr.sort((a, b) => {
    if (a.yes > b.yes) {
      return -1
    } else if (a.yes < b.yes) {
      return 1
    }
    return 0
  })
  return arr
}

const findBest = function (suffixes) {
  let good = []
  Object.keys(suffixes).forEach((left) => {
    let top = topChange(suffixes[left], left)
    if (top[0] && top[0].yes > 1) {
      good.push(top[0])
    }
  })
  good = good.sort((a, b) => {
    if (a.yes > b.yes) {
      return -1
    } else if (a.yes < b.yes) {
      return 1
    }
    return 0
  })
  return good
}

export default findBest
