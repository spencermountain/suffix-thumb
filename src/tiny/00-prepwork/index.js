import align from './_align.js'
import noDupes from './no-dupes.js'

const prep = function (pairs) {
  // remove any unshared prefixes
  pairs = pairs.map(align)
  // remove any impossible combos
  pairs = noDupes(pairs)
  return pairs
}
export default prep

