import { convert, learn, reverse, test, compress, uncompress } from './src/index.js'

// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBD.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBZ.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBG.js'
import pairs from '/Users/spencer/mountain/minimum-model/pairs/NNS.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'

// let pairs = [
//   ["appeared", "appear", 501],
//   ["heard", "hear", 220],
//   ["bore", "bear", 28],
//   ["wore", "wear", 26],
//   ["feared", "fear", 24],
//   ["cleared", "clear", 23],
//   ["disappeared", "disappear", 17],
//   ["endeared", "endear", 3],
//   ["swore", "swear", 2],
//   ["tore", "tear", 2],
//   ["forbore", "forbear", 2],
//   ["neared", "near", 2],
// ]

// let model = learn(pairs, { debug: false })
// console.dir(model, { depth: 5 })

// model = compress(model)
// model = uncompress(model)
// console.dir(model, { depth: 5 })
// console.log(model.rules.d)

// console.dir(model, { depth: 5 })
// console.log(Object.keys(model.exceptions).length, 'exceptions')
// console.log(convert('save', model, true))

// const rev = reverse(model)
// console.log(convert('heard', model, true))
// console.log(convert('hear', rev, true))
// console.log(convert('overprint', rev, true))

// const rev = reverse(model)
// console.log(convert('tally', rev))
test(pairs, { debug: false })
// console.log(classify('gleaning', model))