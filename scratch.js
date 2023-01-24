import { learn, reverse, test, compress, uncompress } from './src/index.js'
import data from '/Users/spencer/mountain/suffix-thumb/test/data/future-simple.js'

// let pairs = Object.keys(data).map(k => [k, data[k][0]])
let pairs = data//Object.keys(data).map(k => [data[k][0], k])//.slice(0, 200)
// pairs = [
//   ['sottomettere', 'sottometterei'],
//   ['teletrasmettere', 'teletrasetterei'],
//   // ['tramettere', 'trametterei'],
//   // ['trasmettere', 'trasmetterei']
// ]

let res = learn(pairs)
console.log(res)
console.log('\n\n')
let small = compress(res)
console.log(small)
let again = uncompress(small)
test(pairs, again)

// { ei: 'e' }, 
// { rei: 're' }, 
// { erei: 'are' },
// 'apprenderei', 'apprendere