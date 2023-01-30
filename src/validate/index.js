// make sure inputs are not impossible to square-up
const validate = function (pairs, opts = {}) {
  let left = new Set()
  let right = new Set()
  pairs = pairs.filter(a => {
    if (left.has(a[0])) {
      // console.log('dupe', a)
      return false
    }
    if (right.has(a[1])) {
      // console.log('dupe', a)
      return false
    }
    left.add(a[0])
    right.add(a[1])
    return true
  })
  return pairs
}

export default validate