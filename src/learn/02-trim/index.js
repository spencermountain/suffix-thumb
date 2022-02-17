const trimPairs = function (pairs, rule) {
  let { reg, to } = rule
  let done = []
  let remain = pairs.filter(pair => {
    let [left, right] = pair
    if (left.match(reg)) {
      if (left.replace(reg, to) === right) {
        done.push(pair)
        return false //done with it
      }
    }
    return true // keep it
  })
  return { remain, done }
}
// remove any rules that challenge existing pairs
const trimRules = function (rules, pairsDone) {
  return rules.filter(r => {
    for (let i = 0; i < pairsDone.length; i += 1) {
      let pair = pairsDone[i]
      if (r.reg.test(pair[0]) && pair[0].replace(r.reg, r.to) !== pair[1]) {
        // console.log('banned rule:', r)
        return false
      }
    }
    return true
  })
}

export { trimRules, trimPairs }