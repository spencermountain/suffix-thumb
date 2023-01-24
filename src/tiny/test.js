import convert from './convert.js'

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
      // console.log(a)
    }
    if (have === a[1]) {
      right += 1
    } else {
      // console.log(have, a[1])
      wrong.push(a)
    }
  })
  // console.log(right.toLocaleString(), 'right, ', wrong.length.toLocaleString(), 'wrong')
  console.log('  ' + blue(percent(right, pairs.length)))
  return wrong
  // console.dir(buildTrie(wrong), { depth: 3 })
}
export default test