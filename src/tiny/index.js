import test from './test.js'
import prepWork from './00-prepwork/index.js'
import firstPass from './01-first-pass/index.js'
import secondPass from './02-second-pass/index.js'
import thirdPass from './03-third-pass/index.js'

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

  // ## 1st-pass ## 
  let rules = addRules(firstPass(pairs, 0), {})

  // ## 2nd-pass ## 
  let missing = test(pairs, { fwd: rules })
  rules = addRules(secondPass(missing, pairs), rules)

  return rules
}

const learn = function (pairs, opts = {}) {
  let model = { fwd: {}, bkwd: {}, both: {}, ex: {} }

  // get forward rules
  model.fwd = findRules(pairs)
  // get backward rules
  let rev = pairs.map(a => [a[1], a[0]])
  model.bkwd = findRules(rev)

  // ## 3rd-pass ## 
  model = thirdPass(model)
  console.log(model)

  return model
}
export default learn