import { convert, learn, reverse, test, compress, uncompress, classify, fingerprint, tiny } from './src/index.js'
import data from '/Users/spencer/mountain/it-compromise/data/models/verbs/conditional.js'

// let pairs = Object.keys(data).map(k => [k, data[k][0]])
let pairs = Object.keys(data).map(k => [data[k][0], k])

// pairs = [
//   ['apporrei', 'apporre'],
//   ['apporterei', 'apportare'],
//   ['apprenderei', 'apprendere'],
// ]

let res = tiny(pairs)
console.log(res)

// { ei: 'e' }, 
// { rei: 're' }, 
// { erei: 'are' },
// 'apprenderei', 'apprendere