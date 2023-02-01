import { learn, compress } from 'suffix-thumb/builds/suffix-thumb.mjs'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-words.js' //0.3kb
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js' //4.5kb
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/future-simple.js' //1.6kb
import pairs from '/Users/spencer/mountain/compromise/data/pairs/Gerund.js'//5kb, 5s

// import pairList from '/Users/spencer/mountain/fr-compromise/data/models/adjective/index.js' //1.7kb, 7 seconds
// let pairs = Object.keys(pairList).map(k => [k, pairList[k][0]])

import filesize from './filesize.js'

let begin = new Date()
let model = learn(pairs)
console.log(model)
let pkd = compress(model)
console.log(pkd)
let end = new Date()
console.log((end.getTime() - begin.getTime()) / 1000, 'seconds')
console.log(filesize(pkd))