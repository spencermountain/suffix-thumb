const red = str => '\x1b[31m' + str + '\x1b[0m'

const findDupes = function (pairs) {
  let already = {}
  return pairs.filter(arr => {
    let [a, b] = arr
    if (already[a]) {
      console.log(red(`[${[a, b].join(', ')}]     -    [${a}, ${already[a]}]`))
      return false
    }
    already[a] = b
    return true
  })
}
export default findDupes