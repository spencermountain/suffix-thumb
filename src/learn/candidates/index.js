import getAll from './01-getAll.js'
import score from './02-score.js'

const noDupes = function (diffs, rules) {
  let already = new Set()
  rules.forEach(m => {
    already.add(m[0])
  })
  diffs = diffs.filter(m => !already.has(m[0]))
  return diffs
}

const suggestDiffs = function (pairs, rules) {
  let diffs = getAll(pairs)
  diffs = score(diffs, pairs)
  diffs = noDupes(diffs, rules)
  return diffs
}
export default suggestDiffs