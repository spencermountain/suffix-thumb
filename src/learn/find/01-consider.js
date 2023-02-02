import convert from './convert.js'

const getPercent = (part, total) => {
  let num = (part / total) * 100;
  num = Math.round(num * 10) / 10;
  return num;
};

// decide whether this rule performs well or not
const considerRule = function (rule, pairs) {
  let total = 0
  let clear = new Set()
  if (!rule) {
    return { total, percent: 0, rule, clear }
  }
  pairs.forEach(pair => {
    let res = convert(pair[0], rule)
    if (res !== null) {
      total += 1
      if (res === pair[1]) {
        clear.add(pair[0])
      }
    }
  })
  return {
    total,
    percent: getPercent(clear.size, total),
    rule,
    clear
  }
}
export default considerRule