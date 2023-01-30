import goodEnough from './lib/goodEnough.js'

const shareRules = function (fwd, pairs, threshold) {
  let same = []
  let both = {}
  // first, isolate any non-changing suffixes
  Object.keys(fwd).forEach(a => {
    if (a === fwd[a]) {
      delete fwd[a]
      same.push(a)
    }
  })
  // second, see which rules are also good in reverse
  let rev = pairs.map(a => [a[1], a[0]])
  Object.keys(fwd).forEach(a => {
    let b = fwd[a]
    let rule = { from: b, to: a }//reverse it
    if (rule.to && goodEnough(rule, rev, threshold)) {
      both[a] = b
      delete fwd[a]
    }
  })

  return {
    fwd,
    both,
    same,
  }
}
export default shareRules