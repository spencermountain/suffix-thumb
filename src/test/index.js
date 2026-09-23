import { convert, reverse, validate } from '../index.js'

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
  const wrong = []
  pairs.forEach(a => {
    const have = convert(a[0], model)
    if (have === a[1]) {
      right += 1
    } else {
      console.log('❌ ', a, '→ ' + have) //eslint-disable-next-line no-console
      wrong.push(a)
    }
  })
  return percent(right, pairs.length)
}

const test = function (pairs, model = {}) {
  pairs = validate(pairs)
  const fwdScore = getNum(pairs, model)
  const bkwdScore = getNum(pairs.map(swap), reverse(model))
  console.log(`${blue(fwdScore)}  -  🔄 ${cyan(bkwdScore)}`) //eslint-disable-next-line no-console
}
export default test