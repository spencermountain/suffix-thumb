import find from './01-getAll.js'
import score from './02-score.js'
import solveFor from './solveProblems.js'


const noDupes = function (diffs, main) {
  let already = new Set()
  main.rules.forEach(m => {
    already.add(m[0])
  })
  diffs = diffs.filter(m => !already.has(m[0]))
  return diffs
}

const merge = function (main, updates) {
  main.exceptions = Object.assign(main.exceptions, updates.exceptions)
  main.rules = updates.rules.concat(main.rules)
  return main
}

const wide = function (pairs, opts) {
  let main = { rules: [], exceptions: {} }
  let diffs = find(pairs)
  diffs = score(diffs, pairs)
  diffs = noDupes(diffs, main)
  let updates = solveFor(diffs[0], pairs)
  if (updates) {
    main = merge(main, updates)
  }
  console.log('\n\n\n\n')
  // console.log(main)

  return main
}
export default wide