import candidates from './candidates/index.js'
import dependents from './dependents/index.js'
import { indexRules } from '../_lib.js'
import { findRemaining } from './lib.js'

const merge = function (main, updates) {
  main.exceptions = Object.assign(main.exceptions, updates.exceptions)
  main.rules = updates.rules.concat(main.rules)
  return main
}

const learn = function (pairs) {
  let main = { rules: [], exceptions: {} }

  while (pairs.length > 0) {
    let diffs = candidates(pairs, main.rules)
    let updates = dependents(diffs[0], pairs)
    console.log('   + ' + updates.rules.length + ' rules')
    console.log('   + ' + Object.keys(updates.exceptions).length + ' exceptions')
    if (updates) {
      main = merge(main, updates)
    }
    pairs = findRemaining(pairs, main)
    console.log(pairs.length + ' remaining\n\n')
  }
  console.log('\n\n\n\n')
  // console.log(main)

  main.rules = indexRules(main.rules)
  return main
}
export default learn