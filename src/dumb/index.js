import firstPass from './first-pass/index.js'
import secondPass from './second-pass/index.js'
import format from './third-pass/index.js'

const dumb = function (pairs) {
  // looks for addition-only changes
  let res = firstPass(pairs)
  // looks for small-removal changes
  res = secondPass(pairs, res)
  // console.log(res)
  return format(pairs, res)
}
export default dumb
