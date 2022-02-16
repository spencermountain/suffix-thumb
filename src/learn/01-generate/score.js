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

const getCounts = function (rule, pairs, opts) {
  let yes = 0
  let no = 0
  pairs.forEach(pair => {
    let [left, right] = pair
    if (!left.match(rule.reg)) {
      return
    }
    let res = left.replace(rule.reg, rule.to)
    if (res === right) {
      yes += 1
    } else {
      no += 1
    }
  })
  let rev = 0
  if (opts.reverse !== false) {
    // rev = revCount(rule, pairs)
    // no += rev
  }
  return { yes, no }
}

const score = function (rules, pairs, opts = {}) {
  rules = rules.map(rule => {
    let { yes, no } = getCounts(rule, pairs, opts)
    rule.yes = yes
    rule.no = no
    delete rule.id
    return rule
  })
  // worst-to-best
  rules = rules.sort((a, b) => {
    if (a.yes > b.yes) {
      return 1
    } else if (a.yes < b.yes) {
      return -1
    }
    return 0
  })
  return rules
}
export default score