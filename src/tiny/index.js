import test from './test.js'
import firstPass from './01-tiny/index.js'
import align from './_align.js'
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
  pairs = pairs.map(align)

  // ====first-pass===
  //  - find smallest rules
  let newDiffs = firstPass(pairs, 0)
  // console.log('+ ', newDiffs)
  found = addRules(found, newDiffs)

  // === second-pass===
  //  - add more safe rules
  let missed = test(pairs, found)
  missed.forEach(arr => {
    let more = secondPass(arr[0], arr[1], pairs)
    if (more) {
      found = addRules(found, [[more.from, more.to]])
    }
  })
  missed = test(pairs, found)

  return found
}
export default tiny