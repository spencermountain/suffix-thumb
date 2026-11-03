import { convert, reverse, validate } from '../index.js'

const cyan = str => '\x1b[36m' + str + '\x1b[0m'
const blue = str => '\x1b[34m' + str + '\x1b[0m'

const percent = (part, total) => {
  if (total === 0) {
    return null
  }
  let num = (part / total) * 100
  return Math.round(num * 10) / 10
}
const show = num => (num === null ? 'N/A (no pairs)' : num + '%')

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
  const fwd = getNum(pairs, model)
  const rev = getNum(validate(pairs).map(swap), reverse(model))
  console.log(`${blue(show(fwd))}  -  🔄 ${cyan(show(rev))}`) // eslint-disable-line no-console
  // % of pairs that convert correctly, in each direction (null when there are no pairs)
  return { fwd, rev }
}
export default test
