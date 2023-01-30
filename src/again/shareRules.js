import goodEnough from './lib/goodEnough.js'

const shareRules = function (fwd, pairs, threshold) {
  // let rev = pairs.map(a => [a[1], a[0]])
  let same = []
  let both = {}
  // first, get non-changing suffixes
  Object.keys(fwd).forEach(a => {
    let b = fwd[a]
    if (a === b) {
      delete fwd[a]
      same.push(a)
    }
  })

  return {
    fwd,
    both,
    same,
  }
}
export default shareRules