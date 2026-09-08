import { reserved } from '../compress/_lib.js'

const isPair = a => Array.isArray(a) && typeof a[0] === 'string' && typeof a[1] === 'string'

// drop pairs that can't be learned:
//  - non-strings, or words with characters the packed format reserves
//  - repeated left-side words (a word can only become one thing)
//  - repeated right-side words, unless {reverse:false} (one-way models can have them)
const validate = function (pairs = [], opts = {}) {
  let left = new Set()
  let right = new Set()
  return pairs.filter(a => {
    if (!isPair(a) || reserved.test(a[0]) || reserved.test(a[1])) {
      return false
    }
    if (left.has(a[0]) || (opts.reverse !== false && right.has(a[1]))) {
      return false
    }
    left.add(a[0])
    right.add(a[1])
    return true
  })
}
export default validate
