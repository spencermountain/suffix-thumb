import { learn, convert, compress, uncompress, reverse, validate } from './src/index.js'
// import pairs from './test/data/fr-nous.js'
// import fs from 'fs'
let pairs = [
  // ['walk', 'walked'],
  // ['talk', 'talked'],

  // ['spied', 'spy'],
  // ['tried', 'try'],

  // ["revokes", "revoke"],
  // ["accedes", "accede"],
  ["juxtaposes", "juxtapose"],
  ["crafted", "be"],
  ["unclear", "be"],
  ["divided", "be"],
  // ["be", "be"],

]
import vbg from '/Users/spencer/mountain/minimum-model/pairs/JJR.js'
// import nous from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'
pairs = Object.entries(vbg)
pairs = validate(pairs)


let model = learn(pairs)
let rev = reverse(model)

console.log(model.rules.r)
model = compress(model)
model = uncompress(model)
console.log(model.rules.r)

// console.dir(rev, { depth: 5 })
console.log(convert('hotter', model))

// pairs.forEach((a) => {
//   let created = convert(a[0], model)
//   if (created !== a[1]) {
//     console.log('error:', a, created)
//   }
// })

// // test reverse, too
// let wrong = 0
// pairs.forEach((a) => {
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