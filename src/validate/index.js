// make sure inputs are not impossible to square-up
const validate = function (pairs, opts = {}) {
  let left = {}
  let right = {}
  pairs = pairs.filter(a => {
    if (left[a[0]] !== undefined) {
      if (opts.debug) {
        console.warn('Duplicate left side:')
        console.log('  1.', [a[0], left[a[0]]])
        console.log('  2.', a)
      }
      return false
    }
    if (right[a[1]] !== undefined) {
      if (opts.debug) {
        console.warn('Duplicate right side:')
        console.log('  1.', [right[a[1]], a[1]])
        console.log('  2.', a)
      }
      if (opts.inverse === false) {
        return true //allow it
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