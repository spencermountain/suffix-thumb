import data from '/Users/spencer/mountain/minimum-model/pairs/NNS.js'
import firstPass from './1st-pass/index.js'
import secondPass from './2nd-pass/index.js'


let res = firstPass(data)
secondPass(res)
console.log(res)