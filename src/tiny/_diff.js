import substr from './_substr.js'

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

// line-up "abcdfoo" with "zzabcdbar"
const align = function (a, b) {
  let res = substr(a, b)
  // clip left side
  a = a.substring(res.offset)
  // clip right side
  for (let i = 0; i < b.length; i += 1) {
    if (b.startsWith(res.sequence)) {
      break
    }
    b = b.substring(1)
  }
  return { a, b }
}

const diff = function (a, b, peek) {
  let res = align(a, b)
  return subtract(res.a, res.b, peek)
}
export default diff
console.log(diff('ohyeahxxabcfoo', 'nonoabcbar'))