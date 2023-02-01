import convert from '../lib/convert.js'

const percent = (part, total) => {
  let num = (part / total) * 100;
  num = Math.round(num * 10) / 10;
  return num;
};

const testRule = function (rule, pairs, threshold) {
  let right = 0
  let total = 0
  let errors = pairs.filter(pair => {
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
  let pass = false
  // console.log(rule, score)
  if (score > threshold) {
    pass = true
  }
  return { errors, pass, rule }
}
export default testRule