import firstPass from './first-pass/index.js'
import secondPass from './second-pass/index.js'

const dumb = function (pairs) {
  let res = firstPass(pairs)
  res = secondPass(pairs, res)
  console.log(res)
}
export default dumb
