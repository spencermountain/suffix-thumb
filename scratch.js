import { convert, learn, reverse, test, classify } from './src/index.js'

// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBD.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBZ.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBG.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/NNS.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'

// let pairs = [
//   ["offering", "offer", 1346],
//   ["considering", "consider", 1334],
//   ["entering", "enter", 1082],
//   ["delivering", "deliver", 1080],
//   ["fostering", "foster", 1065],
//   ["covering", "cover", 1013],
//   ["administering", "administer", 611],
//   ["partnering", "partner", 541],
//   ["transferring", "transfer", 297],
//   ["referring", "refer", 293],
//   ["ordering", "order", 272],
//   ["gathering", "gather", 267],
//   ["registering", "register", 260],
//   ["tendering", "tender", 245],
//   ["volunteering", "volunteer", 223],
//   ["differing", "differ", 213],
//   ["suffering", "suffer", 199],
//   ["lowering", "lower", 164],
//   ["furthering", "further", 160],
// ]

let model = learn(pairs, { debug: false })
console.dir(model, { depth: 5 })
// console.log(Object.keys(model.exceptions).length, 'exceptions')
// console.log(convert('suffering', model, true))

const rev = reverse(model)
console.log(convert('offer', rev, true))
// console.log(convert('overprint', rev, true))

// const rev = reverse(model)
// console.log(convert('tally', rev))
test(pairs)
// console.log(classify('gleaning', model))