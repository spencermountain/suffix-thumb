import { convert, compress, uncompress, reverse, validate, debug, test } from './src/index.js'
import learn from './smaller/index.js'



let pairs = [
  // ['walk', 'walked'],
  // ['talk', 'talked'],

  ['walk', 'walking'],
  ['smoke', 'smoking'],
  ['talk', 'talking'],

]
import vbg from '/Users/spencer/mountain/minimum-model/pairs/VBD.js'
// import nous from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'
pairs = vbg


// let model = learn(pairs)
test(pairs)
// let rev = reverse(model)
// console.dir(rev, { depth: 5 })
// model = compress(model)
// model = uncompress(model)
// console.dir(model, { depth: 5 })
// console.log(log(model))

// console.log(convert('smile', model))

// console.dir(rev, { depth: 5 })
// console.log(convert('hotter', model))

// pairs.forEach((a) => {
//   let created = convert(a[0], model)
//   if (created !== a[1]) {
//     console.log('error:', a, created)
//   }
// })

// test reverse, too
// let wrong = 0
// pairs.forEach((a) => {
//   // console.log(debug(a[1], rev))
//   let created = convert(a[1], rev)
//   if (created !== a[0]) {
//     wrong += 1
//     console.log('rev:', a, created)
//   }
// })
// const percent = (part, total) => {
//   let num = (part / total) * 100;
//   num = Math.round(num * 10) / 10;
//   return num + '%'
// };
// console.log(percent(wrong, pairs.length))