import getAll from './01-getAll.js'
import score from './02-score.js'

const suggestDiffs = function (pairs) {
  let diffs = getAll(pairs)
  diffs = score(diffs, pairs)
  return diffs
}
export default suggestDiffs