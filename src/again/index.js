// import getSuffix from './lib/getSuffix.js'
// import goodEnough from './lib/goodEnough.js'
// import convert from './lib/convert.js'
import findRules from './findRules.js'


const learn = function (pairs, opts = {}) {
  let threshold = opts.threshold || 80
  console.log(pairs.length)
  let rules = findRules(pairs, threshold)
  return { fwd: rules }
}
export default learn