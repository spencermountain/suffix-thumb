const revCount = function (rule, pairs) {
  let no = 0
  pairs.forEach(pair => {
    let [left, right] = pair
    let reg = new RegExp(rule[1] + '$')
    if (!right.match(reg)) {
      return
    }
    let res = right.replace(reg, rule[0])
    if (res !== left) {
      no += 1
    }
  })
  return no
}

const getCounts = function (diff, pairs, opts) {
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
  let rev = 0
  if (opts.reverse !== false) {
    rev = revCount(diff, pairs)
    // no += rev
  }
  return { yes, no, rev }
}

const score = function (diffs, pairs, opts = {}) {
  diffs = diffs.map(diff => {
    let { yes, no, rev } = getCounts(diff, pairs, opts)
    diff.push(yes)
    diff.push(no)
    diff.push(rev)
    return diff
  })
  // if (opts.reverse !== false) {
  // diffs = diffs.filter(a => !a[1])
  // }
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