import nouns from '/Users/spencer/mountain/de-compromise/data/models/nouns.js'
import dumb from './src/dumb/index.js'
import fs from 'fs'


let model = Object.keys(nouns).map(k => {
  let s = new Set([k])
  nouns[k].s.forEach(str => s.add(str))
  nouns[k].p.forEach(str => s.add(str))
  return Array.from(s)
})
console.log(model.length)
model = model.filter(a => a.length === 2)
console.log(model.length)
console.log(model)
// let together = {}
// for (let i = 0; i < 4; i += 1) {
//   console.log(`=====${i}=====`)
// let pairs = []
// model.forEach(a => {
//   pairs.push([a[0], a[1]])
// })
// console.log(pairs)
// let res = dumb(pairs)
// console.log(res)
//   res.rules.forEach(a => {
//     let [from, to] = a
//     together[from] = together[from] || []
//     together[from][i] = to
//   })
// }

// fs.writeFileSync('./together.js', 'export default ' + JSON.stringify(together, null, 2))
// console.log(JSON.stringify(res, null, 2))