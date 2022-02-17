import { convert, learn, reverse, test, compress, uncompress } from './src/index.js'

// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBD.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBZ.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBG.js'
import pairs from '/Users/spencer/mountain/minimum-model/pairs/NNS.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'


// let pairs = [
//   ["read", "read"],
//   ["spread", "spread"],
//   ["bread", "breaded"],
//   ["head", "headed"],
//   ["spearhead", "spearheaded"],
//   ["thread", "threaded"],
//   ["reread", "reread"],
// ]

// let model = learn(pairs, { debug: true })
// console.dir(model, { depth: 5 })

// const rev = reverse(model)
// pairs.forEach(pair => {
//   let res = convert(pair[0], model)
//   if (res !== pair[1]) {
//     console.log(pair[0] + ' - > ', res)
//   }
// })
// console.log(convert('bread', rev, true))

test(pairs, { debug: false })