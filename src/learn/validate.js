
// make sure inputs are not impossible to square-up
const validate = function (pairs, opts = {}) {
  let left = {}
  let right = {}
  pairs = pairs.filter(a => {
    if (left[a[0]] !== undefined) {
      if (opts.verbose) {
        console.warn('Duplicate left side:')
        console.log('  1.', [a[0], left[a[0]]])
        console.log('  2.', a)
      }
      return false
    }
    if (opts.inverse && right[a[1]] !== undefined) {
      if (opts.verbose) {
        console.warn('Duplicate right side:')
        console.log('  1.', [right[a[1]], a[1]])
        console.log('  2.', a)
      }
      return false
    }
    left[a[0]] = a[1]
    right[a[1]] = a[0]
    return true
  })
  return pairs
}

export default validate