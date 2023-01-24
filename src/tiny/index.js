import test from './test.js'
import prepWork from './00-prepwork/index.js'
import firstPass from './01-tiny/index.js'
import secondPass from './02-longer/index.js'
import thirdPass from './03-reverse/index.js'


const addRules = function (found, rules) {
  rules.forEach(a => {
    let len = a[0].length
    found.rules[len] = found.rules[len] || {}
    found.rules[len][a[0]] = a[1]
  })
  return found
}


const learn = function (pairs, opts = {}) {
  let model = { rules: [] }
  // line-up each pair
  pairs = prepWork(pairs)

  // ==== first-pass  - find good rules
  let newDiffs = firstPass(pairs, 0)
  model = addRules(model, newDiffs)

  // === second-pass  - add perfectly safe rules
  let missed = test(pairs, model)
  missed.forEach(arr => {
    let more = secondPass(arr[0], arr[1], pairs)
    if (more) {
      model = addRules(model, [[more.from, more.to]])
    }
  })
  missed = test(pairs, model)

  // === third pass - add exceptions
  model.exceptions = missed.reduce((h, a) => {
    h[a[0]] = a[1]
    return h
  }, {})
  missed = test(pairs, model)
  if (missed.length !== 0) {
    console.log('huh - ', missed)
  }

  // === third pass - add reverse
  if (opts.reverse !== false) {
    model.rev = thirdPass(pairs, model)
  }
  return model
}
export default learn