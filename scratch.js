import { learn, reverse, test, compress, uncompress, validate } from './src/index.js'
import data from '/Users/spencer/mountain/it-compromise/data/models/verbs/conditional.js'

let pairs = Object.keys(data).map(k => [k, data[k][0]])
// let pairs = Object.keys(data).map(k => [data[k][0], k])//.slice(0, 200)
// pairs = [
//   ['victorien', 'victorienne'],
//   ['vidé', 'vidée'],
//   ['vietnamien', 'vietnamienne'],
//   ['vil', 'vile'],
//   ['vilain', 'vilaine'],
// ]
const swap = (a) => [a[1], a[0]]

let model = learn(pairs)

let pkd = compress(model)
console.log(pkd)
model = uncompress(pkd)
// console.log(model)

test(pairs, model)
test(pairs.map(swap), reverse(model))