import convert from '../convert/index.js'

const blue = str => '\x1b[34m' + str + '\x1b[0m'

const percent = (part, total) => {
  let num = (part / total) * 100;
  num = Math.round(num * 10) / 10;
  return num + '%';
};

const test = function (pairs, model) {
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
  // console.log(right.toLocaleString(), 'right, ', wrong.length.toLocaleString(), 'wrong')
  let rev = model.reversed ? '[rev]' : '     '
  console.log(blue(`${rev} ` + percent(right, pairs.length)))
  return wrong
}
export default test