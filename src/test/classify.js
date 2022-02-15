import classify from '../classify/index.js'

const green = str => '\x1b[32m' + str + '\x1b[0m'
const red = str => '\x1b[31m' + str + '\x1b[0m'
const yellow = str => '\x1b[33m' + str + '\x1b[0m'
const dim = str => '\x1b[2m' + str + '\x1b[0m'

const percent = (part, total) => {
  let num = (part / total) * 100;
  num = Math.round(num * 10) / 10;
  return num + '%'
};

const testSide = function (pairs, model, side) {
  let nulls = 0
  let wrong = 0
  let right = 0
  pairs.forEach((a) => {
    let str = side === 'Left' ? a[0] : a[1]
    let found = classify(str, model, true)
    if (found === null) {
      nulls += 1
      return
    }
    if (found === side) {
      right += 1
      return
    }
    wrong += 1
  })
  console.log(`  [${side}]:`)
  console.log(yellow(`      nulls:`), nulls.toLocaleString(), '  ', dim(percent(nulls, pairs.length)))
  console.log(green(`      right:`), right.toLocaleString(), '  ', dim(percent(right, pairs.length)))
  console.log(red(`      wrong:`), wrong.toLocaleString(), '  ', dim(percent(wrong, pairs.length)))
}
export default testSide