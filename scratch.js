import { convert, learn, reverse, test, classify } from './src/index.js'

// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBD.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBZ.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBG.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/NNS.js'
import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'

// let pairs = []

let model = learn(pairs, { debug: true })
// console.dir(model, { depth: 5 })
console.log(Object.keys(model.exceptions).length, 'exceptions')
// console.log(convert('walruses', model, true))

// const rev = reverse(model)
// console.log(convert('tally', rev))
// test(pairs)
// console.log(classify('gleaning', model))