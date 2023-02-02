import consider from './find/01-consider.js'

// some rules are also good in reverse
const tryBackward = function (fwd, rev, opts) {
  let both = {}
  let pending = rev.slice(0)
  let finished = []
  let rules = Object.entries(fwd).reverse()
  rules.forEach(a => {
    let rule = { from: a[1], to: a[0] }
    let result = consider(rule, rev, opts)
    // did it do okay?
    if (result.percent > opts.threshold) {
      // move it to 'both' rules
      both[rule.to] = rule.from
      delete fwd[rule.to]
      // 
    }
  })
  return {
    fwd,
    both,
    revPairs: {
      pending,
      finished
    }
  }
}
export default tryBackward