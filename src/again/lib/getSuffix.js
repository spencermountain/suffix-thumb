// get the suffix diff between a and b
const getSuffix = function (pair, peekLen = 0) {
  let all = []
  let [from, to] = pair
  for (let i = 0; i < from.length; i += 1) {
    if (from[i] === to[i]) {
      all.push(from[i])
    } else {
      break
    }
  }
  let prefix = all.length - peekLen
  return {
    from: from.substring(prefix),
    to: to.substring(prefix)
  }
}

export default getSuffix