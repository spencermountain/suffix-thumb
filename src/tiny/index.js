import test from './test.js'
import prepWork from './00-prepwork/index.js'
import firstPass from './01-first-pass/index.js'
import secondPass from './02-second-pass/index.js'
import thirdPass from './03-third-pass/index.js'
import merge from './_merge.js'


const addRules = function (rules, suffixes) {
  rules.forEach(arr => {
    let [a, b] = arr
    if (suffixes[a]) {
      console.log('already', arr)
      return
    }
    suffixes[a] = b
  })
  return suffixes
}

const findRules = function (pairs) {
  // line-up each pair
  pairs = prepWork(pairs)
  // ## 1st-pass - greedy ## 
  let rules = addRules(firstPass(pairs, 0), {})
  // ## 2nd-pass - fixes ## 
  let missing = test(pairs, { fwd: rules })
  rules = addRules(secondPass(missing, pairs), rules)
  return rules
}

const learn = function (pairs) {
  let model = { fwd: {}, bkwd: {}, both: {}, ex: {} }
  let rev = pairs.map(a => [a[1], a[0]])

  // ## create rules fwd/rev ## 
  model.fwd = findRules(pairs)
  model.bkwd = findRules(rev)

  // merge fwd/rev, when possible
  model = merge(model)

  // ## add missing pairs ## 
  model = thirdPass(pairs, model)

  return model
}
export default learn