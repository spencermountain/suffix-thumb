function toRegExp(str) {
  str = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
  return new RegExp(str + '$')
}

const getNos = function (rule, pairs) {
  let { left, right } = rule
  let done = []
  let nos = []
  pairs.forEach(a => {
    if (a[0].endsWith(left)) {
      let reg = toRegExp(left)
      let out = a[0].replace(reg, right)
      if (out !== a[1]) {
        nos.push(a)
      } else {
        done.push(a[0])
      }
    }
  })
  return { nos: nos, done }
}
export default getNos