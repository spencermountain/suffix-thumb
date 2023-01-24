import { learn, reverse, test, compress, uncompress, classify, fingerprint, tiny, pack, unpack } from './src/index.js'
import data from '/Users/spencer/mountain/it-compromise/data/models/verbs/conditional.js'

// let pairs = Object.keys(data).map(k => [k, data[k][0]])
let pairs = Object.keys(data).map(k => [data[k][0], k])//.slice(0, 200)
// pairs = [
//   ['sottomettere', 'sottometterei'],
//   ['teletrasmettere', 'teletrasetterei'],
//   // ['tramettere', 'trametterei'],
//   // ['trasmettere', 'trasmetterei']
// ]

// console.log(compress(learn(pairs)))
let res = tiny(pairs)
console.log(res)
console.log('\n\n')
let small = pack(res)
console.log(small)
let again = unpack(small)
test(pairs, again)

// { ei: 'e' }, 
// { rei: 're' }, 
// { erei: 'are' },
// 'apprenderei', 'apprendere