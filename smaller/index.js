import data from '/Users/spencer/mountain/minimum-model/pairs/NNS.js'
import firstPass from './1st-pass/index.js'
import secondPass from './2nd-pass/index.js'


let res = firstPass(data)
console.log(res.rules.length, res.exceptions.length)
res = secondPass(res, data)
console.log(res.rules.length, res.exceptions.length)
// console.dir(res, { depth: 5 })
// console.log(res)