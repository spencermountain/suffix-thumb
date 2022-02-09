const getCounts = function (diff, pairs) {
  let yes = 0
  let no = 0
  pairs.forEach(pair => {
    let [left, right] = pair
    let reg = new RegExp(diff[0] + '$')
    if (!left.match(reg)) {
      return
    }
    let res = left.replace(reg, diff[1])
    if (res === right) {
      yes += 1
    } else {
      no += 1
    }
  })
  return { yes, no }
}

const score = function (diffs, pairs) {
  diffs = diffs.map(diff => {
    let { yes, no } = getCounts(diff, pairs)
    diff.push(yes)
    diff.push(no)
    return diff
  })
  diffs = diffs.sort((a, b) => {
    if (a[2] > b[2]) {
      return -1
    } else if (a[2] < b[2]) {
      return 1
    }
    return 0
  })
  return diffs
}
export default score