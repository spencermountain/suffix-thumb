import candidates from './candidates/index.js'
import dependents from './dependents/index.js'
import reverse from '../reverse/index.js'
// import suggestReverse from './addReverse.js'
import convert from '../convert/index.js'

import { indexRules, unIndex } from '../_lib.js'
import { findRemaining } from './lib.js'

const merge = function (main, updates) {
  main.exceptions = Object.assign(main.exceptions, updates.exceptions)
  main.rules = updates.rules.concat(main.rules)
  return main
}

const doesUnderCut = function (a, rules) {
  return rules.find(rule => {
    if (rule[0].endsWith(a[0])) {
      return true
    }
    return false
  })
}

const firstGoodDiff = function (candidates, main) {
  return candidates.find(a => {
    if (doesUnderCut(a, main.rules)) {
      return false
    }
    return true
  })
}

const revProblems = function (pairs, model) {
  let issues = []
  const rev = reverse(model)
  pairs.forEach(a => {
    let [left, right] = a
    if (convert(right, rev) !== left) {
      issues.push(a.slice(0, 2).reverse())
    }
  })
  return issues
}

const learn = function (pairs, opts = {}) {
  let main = { rules: [], exceptions: {} }
  let remain = pairs.slice(0)
  while (remain.length > 0) {
    let diffs = candidates(remain, main.rules)
    let bestDiff = firstGoodDiff(diffs, main)
    let updates = dependents(bestDiff, remain)
    if (updates) {
      main = merge(main, updates)
    }
    remain = findRemaining(remain, main)
    // console.log(pairs.length + ' remaining\n\n')
  }
  main.rules = indexRules(main.rules)
  // should we add any required reverse rules too?
  if (opts.reverse !== false) {
    let issues = revProblems(pairs, main)
    let backModel = learn(issues, { reverse: false })//recursive
    main.rev = backModel.rules
    Object.assign(main.exceptions, backModel.exceptions)
  }
  return main
}
export default learn