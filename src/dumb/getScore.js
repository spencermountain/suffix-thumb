
const convert = function (str, res) {
  for (let i = 0; i < res.rules.length; i += 1) {
    let [from, to] = res.rules[i]
    if (str.endsWith(from)) {
      // console.log('+' + str.substring(0, str.length - from.length) + ' | ' + to)
      return str.substring(0, str.length - from.length) + to
    }
  }
  return str + res.fallback
}

const percent = (part, total) => {
  let num = (part / total) * 100;
  num = Math.round(num * 10) / 10;
  return num;
};

const getScore = function (pairs, res) {
  let wrong = []
  pairs.forEach(a => {
    let have = convert(a[0], res)
    if (have !== a[1]) {
      wrong.push(a)
    }
  })
  return {
    score: percent(pairs.length - wrong.length, pairs.length),
    wrong
  }
}
export default getScore