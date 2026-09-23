import { convert, reverse, validate } from '../index.js'

const cyan = str => '\x1b[36m' + str + '\x1b[0m'
const blue = str => '\x1b[34m' + str + '\x1b[0m'

const percent = (part, total) => {
  if (total === 0) {
    return 'N/A (no pairs)'
  }
  let num = (part / total) * 100
  num = Math.round(num * 10) / 10
  return num + '%'
}

const swap = (a) => [a[1], a[0]]

const getNum = function (pairs, model) {
  let right = 0
  pairs.forEach(a => {
    const have = convert(a[0], model)
    if (have === a[1]) {
      right += 1
    } else {
      console.log('❌ ', a, '→ ' + have) // eslint-disable-line no-console
    }
  })
  return percent(right, pairs.length)
}

const test = function (pairs, model = {}) {
  // Keep every accepted forward pair, matching learn()'s duplicate handling.
  pairs = validate(pairs, { reverse: false })
  const fwdScore = getNum(pairs, model)
  const bkwdScore = getNum(validate(pairs).map(swap), reverse(model))
  console.log(`${blue(fwdScore)}  -  🔄 ${cyan(bkwdScore)}`) // eslint-disable-line no-console
}
export default test
