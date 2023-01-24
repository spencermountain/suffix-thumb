
//sweep-through all suffixes
const convert = function (str = '', rules = [], fallback = []) {
  const len = str.length
  let max = len <= 6 ? len - 1 : 6
  for (let i = max; i >= 1; i -= 1) {
    let suffix = str.substring(len - i, str.length)
    if (rules[suffix.length].hasOwnProperty(suffix) === true) {
      let pre = str.slice(0, len - i)
      let post = rules[suffix.length][suffix]
      return pre + post
    }
  }
  // remove generic tail
  // if (fallback[0]) {
  // if (str.endsWith(fallback[0])) {
  //   console.log(str)
  // }
  // return str.replace(fallback[0],'')
  //   return str
  // }
  // add a generic tail
  // if (fallback[1]) {
  // return str += fallback[1]
  // }
  return str //unchanged
}
export default convert