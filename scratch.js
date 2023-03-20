import { learn, test, reverse, convert, compress, uncompress, classify, classifyTest, classifier, } from './src/index.js'
import summarize from './scripts/summarize.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/tests/data/fr-words.js' //0.3kb
// import pairs from '/Users/spencer/mountain/suffix-thumb/tests/data/future-simple.js' //1.6kb
// import pairs from '/Users/spencer/mountain/suffix-thumb/tests/data/fr-nous.js' //4.5kb
// import pairs from '/Users/spencer/mountain/suffix-thumb/tests/data/perfecto.js' //
// import pairs from '/Users/spencer/mountain/suffix-thumb/tests/data/present-tense.js' //


import adj from '/Users/spencer/mountain/de-compromise/data/models/adjectives/adjectives.js'
// import dumb from './src/dumb/index.js'

let pairs = []
Object.keys(adj).forEach(k => {
  pairs.push([k, adj[k][3]])
})

// let input = {}
// pairs.forEach(p => {
//   input[p[0]] = 'Left'
//   input[p[1]] = 'Right'
// })

let opts = {
  // threshold: 70,
  // min: 2,
  // reverse: true
}

let model = learn(pairs, opts)
console.log(model.both)
// classifyTest(input, model)
// console.log(classify('wordi', model))
// let model = learn(pairs, opts)
// summarize(model)
// test(pairs, model)