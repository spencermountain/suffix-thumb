
const subtract = function (from, to, peekLen = 0) {
  let all = []
  for (let i = 0; i < from.length; i += 1) {
    if (from[i] === to[i]) {
      all.push(from[i])
    } else {
      break
    }
  }
  let prefix = all.length - peekLen
  return {
    common: all.join(''),
    from: from.substring(prefix),
    to: to.substring(prefix)
  }
}

export default subtract