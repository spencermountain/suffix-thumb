import { learn, reverse, test, compress, uncompress, validate } from './src/index.js'
import data from '/Users/spencer/mountain/it-compromise/data/models/verbs/conditional.js'

// let pairs = Object.keys(data).map(k => [k, data[k][0]])
let pairs = Object.keys(data).map(k => [data[k][0], k])//.slice(0, 200)

const swap = (a) => [a[1], a[0]]

pairs = validate(pairs)
let model = learn(pairs)
// test(pairs, model)

let rev = reverse(model)
console.log(model)
console.log(rev)
test(pairs.map(swap), rev)
// console.log(rev)
