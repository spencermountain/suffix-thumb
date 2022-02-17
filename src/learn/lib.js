
const trimDown = function (issues, best) {
  let reg = new RegExp(best[0] + '$')
  let pass = []
  let fail = []
  issues.forEach(a => {
    if (!a[0].match(reg)) {
      fail.push(a)
      return
    }
    if (a[0].replace(reg, best[1]) === a[1]) {
      pass.push(a)
      return
    }
    fail.push(a)
  })
  return { pass, fail }
}

const findRemaining = function (pairs, main) {
  pairs = pairs.filter(a => !main.exceptions.hasOwnProperty(a[0]))
  main.rules.forEach(rule => {
    pairs = trimDown(pairs, rule).fail
  })
  return pairs
}

// faster than a regex replace
const replace = function (w, suff, to) {
  // not a match
  if (w.substring(w.length - suff.length) !== suff) {
    return w
  }
  return w.substring(0, w.length - suff.length) + to
}

const match = function (w, suff) {
  return w.substring(w.length - suff.length) === suff
}

export { trimDown, findRemaining, replace, match }

// console.log(replace('swimming', 'ing', 's'))