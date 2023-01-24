import test from './test.js'
import prepWork from './00-prepwork/index.js'
import firstPass from './01-tiny/index.js'
import align from './00-prepwork/_align.js'
import secondPass from './02-longer/index.js'

const addRules = function (found, rules) {
  rules.forEach(a => {
    let len = a[0].length
    found.rules[len] = found.rules[len] || {}
    found.rules[len][a[0]] = a[1]
  })
  return found
}


const tiny = function (pairs) {
  let found = { rules: [{}, {}, {}, {}] }
  // line-up each pair
  pairs = prepWork(pairs)

  // ==== first-pass  - find good rules
  let newDiffs = firstPass(pairs, 0)
  found = addRules(found, newDiffs)

  // === second-pass  - add perfectly safe rules
  let missed = test(pairs, found)
  missed.forEach(arr => {
    let more = secondPass(arr[0], arr[1], pairs)
    if (more) {
      found = addRules(found, [[more.from, more.to]])
    }
  })
  missed = test(pairs, found)

  // ==third pass - add exceptions
  found.exceptions = missed.reduce((h, a) => {
    h[a[0]] = a[1]
    return h
  }, {})
  missed = test(pairs, found)
  if (missed.length !== 0) {
    console.log('huh - ', missed)
  }

  return found
}
export default tiny