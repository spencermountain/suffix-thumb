import learn from './learn.js'
import { indexRules, unIndex } from '../_lib.js'
import findIssues from './03-reverse/findIssues.js'
import learnSafe from './03-reverse/learnSafe.js'


const mergeExceptions = function (fwd, bkwd) {
  Object.entries(bkwd).forEach(b => {
    fwd[b[1]] = b[0]
  })
  return fwd
}


const learnBoth = function (pairs, opts = {}) {
  let fwd = learn(pairs, opts)
  if (opts.reverse !== false) {
    let { resolved, issues } = findIssues(fwd, pairs, opts)
    let bkwd = learnSafe(issues, resolved, opts)
    // merge exceptions
    Object.assign(fwd.exceptions, bkwd.exceptions)
    // share rules
    fwd.rev = indexRules(bkwd.rules)
  }
  fwd.rules = indexRules(fwd.rules)
  return fwd
}

export default learnBoth