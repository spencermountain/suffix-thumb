import convert from '../convert/index.js'
import reverse from '../reverse/index.js'

const cyan = str => '\x1b[36m' + str + '\x1b[0m'
const blue = str => '\x1b[34m' + str + '\x1b[0m'

const percent = (part, total) => {
  let num = (part / total) * 100;
  num = Math.round(num * 10) / 10;
  return num + '%'
};

const swap = (a) => [a[1], a[0]]

const getNum = function (pairs, model) {
  let right = 0
  let wrong = []
  pairs.forEach(a => {
    let have = convert(a[0], model)
    if (have === null) {
      have = a[0]
    }
    if (have === a[1]) {
      right += 1
    } else {
      wrong.push(a)
    }
  })
  return percent(right, pairs.length)
}

const test = function (pairs, model = {}) {
  let fwdScore = getNum(pairs, model)
  let bkwdScore = getNum(pairs.map(swap), reverse(model))
  console.log(`${blue(fwdScore)}  -  🔄 ${cyan(bkwdScore)}`)
}
export default test