import passThrough from './passThrough.js'
import unchanged from './unchanged.js'



const secondPass = function (info, pairs,) {
  let { rules, exceptions } = info
  let res = unchanged(rules, exceptions)
  // console.log(res)
  res = passThrough(res.rules, res.exceptions, pairs)



  // let obj = exceptions.reduce((h, a) => {
  //   h[a[0]] = a[1]
  //   return h
  // }, {})
  return res
}
export default secondPass