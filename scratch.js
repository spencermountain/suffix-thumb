import { convert, learn, reverse, test, compress, uncompress, classify, fingerprint } from './src/index.js'

// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBD.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBZ.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBG.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/NNS.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'
// import models from '/Users/spencer/mountain/compromise/src/2-two/preTagger/model/models/_data.js'

let pairs = [
  ['walk', 'walked'],
  ['talk', 'talked'],
  ['smoke', 'smoked'],
  ['bike', 'biked'],
  ['go', 'went'],
]
let model = fingerprint(pairs.map(a => a[0]), pairs.map(a => a[1]))
// console.log(model)
// let model = learn(pairs)
// let out = convert('addressed', uncompress(models.PastTense))
// console.log(out)
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

// test(pairs, { debug: false })