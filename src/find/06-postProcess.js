
const percent = (part, total) => {
  let num = part / total
  num = Math.round(num * 1000) / 1000
  return num
}

const reduceExceptions = function (res) {
  let final = {}
  let { rules, exceptions } = res
  Object.keys(exceptions).forEach(k => {
    let found = rules.find((rule) => {
      return k.endsWith(rule[0])
    })
    if (!found) {
      final[k] = exceptions[k]
      return
    }
    let tmp = k.replace(found[0], found[1])
    // did we do it wrong?
    if (tmp !== exceptions[k]) {
      final[k] = exceptions[k]
    } else {
      // console.log(k)
    }
  })
  return final
}


const postProcess = function (res, inputSize) {
  let count = 0
  res.rules = res.rules.map((a) => {
    count += a[2]
    return a.slice(0, 2)
  })
  // convert exceptions to an object
  res.exceptions = res.exceptions.reduce((h, a) => {
    h[a[0]] = a[1]
    return h
  }, {})
  // sort rules results
  res.rules = res.rules.sort((a, b) => {
    if (a[0].length > b[0].length) {
      return -1
    } else if (a[0].length < b[0].length) {
      return 1
    }
    return 0
  })
  // some exceptions are not anymore
  res.exceptions = reduceExceptions(res)
  // add percentage covered
  res.coverage = percent(count, inputSize)
  return res
}
export default postProcess