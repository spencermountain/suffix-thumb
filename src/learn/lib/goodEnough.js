import convert from './convert.js'

const percent = (part, total) => {
  let num = (part / total) * 100;
  num = Math.round(num * 10) / 10;
  return num;
};

const goodEnough = function (rule, pairs, threshold) {
  let right = 0
  let total = 0
  pairs.forEach(pair => {
    let [a, b] = pair
    let res = convert(a, rule)
    if (res !== null) {
      total += 1
      if (res === b) {
        right += 1
      }
    }
  })
  let score = percent(right, total)
  // console.log(rule, score)
  if (score > threshold) {
    return true
  }
  return false
}
export default goodEnough