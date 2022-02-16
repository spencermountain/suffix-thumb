import learn from './learn.js'
import { indexRules, unIndex } from '../_lib.js'

const diffRules = function (fwd, bkwd) {
  console.log(bkwd.length)
  bkwd = bkwd.filter(b => {
    let [left, right] = b
    return !fwd.find(a => a[1] === left && a[0] === right)
  })
  console.log(bkwd.length)
  return bkwd
}

const mergeExceptions = function (fwd, bkwd) {
  Object.entries(bkwd).forEach(b => {
    fwd[b[1]] = b[0]
  })
  return fwd
}

const learnBoth = function (pairs, opts = {}) {
  let fwd = learn(pairs, opts)
  if (opts.reverse !== false) {
    pairs = pairs.map(a => [a[1], a[0]])
    let bkwd = learn(pairs, opts)
    // merge exceptions
    fwd.exceptions = mergeExceptions(fwd.exceptions, bkwd.exceptions)
    // merge rules
    // fwd.rev = diffRules(fwd.rules, bkwd.rules)
    fwd.rev = bkwd.rules
    fwd.rev = indexRules(fwd.rev)
  }
  fwd.rules = indexRules(fwd.rules)
  return fwd
}

export default learnBoth