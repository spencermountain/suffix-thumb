const reduceExceptions = function (res) {
  let final = {}
  let { rules, exceptions } = res
  Object.keys(exceptions).forEach(k => {
    let found = rules.find((rule) => {
      return k.endsWith(rule[0])
    })
    // no rule applies
    if (!found) {
      final[k] = exceptions[k]
      return
    }
    let tmp = k.replace(found[0], found[1])
    // did we do it wrong?
    if (tmp !== exceptions[k]) {
      final[k] = exceptions[k] //still an exception then
    } else {
      // not an exception now
      // console.log(k)
    }
  })
  return final
}


const postProcess = function (res) {
  // some exceptions are not anymore
  res.exceptions = reduceExceptions(res)
  return res
}
export default postProcess