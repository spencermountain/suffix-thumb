import classify from '../get/index.js'

const percent = (part, total) => {
  let num = (part / total) * 100;
  num = Math.round(num * 10) / 10;
  return num;
};

const classifyTest = function (input, model) {
  let pairs = Object.entries(input)
  let right = 0
  pairs.forEach(p => {
    if (classify(p[0], model) === p[1]) {
      right += 1
    } else {
      console.log('❌', p)
    }
  })
  let p = percent(right, pairs.length)
  console.log(`${p}%`)
  return p
}
export default classifyTest