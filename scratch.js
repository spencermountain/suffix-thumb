import { learn, test, reverse, convert, compress, uncompress, classify, classifyTest, classifier } from './src/index.js'
import summarize from './scripts/summarize.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/tests/data/fr-words.js' //0.3kb
// import pairs from '/Users/spencer/mountain/suffix-thumb/tests/data/future-simple.js' //1.6kb
// import pairs from '/Users/spencer/mountain/suffix-thumb/tests/data/fr-nous.js' //4.5kb
// import pairs from '/Users/spencer/mountain/suffix-thumb/tests/data/perfecto.js' //
// import pairs from '/Users/spencer/mountain/suffix-thumb/tests/data/present-tense.js' //


// import adj from '/Users/spencer/mountain/de-compromise/data/models/adjectives/adjectives.js'
// import adj from '/Users/spencer/mountain/de-compromise/data/models/verbs/subjunctive-1.js'
import adj from '/Users/spencer/mountain/compromise/data/pairs/Gerund.js'
import getScore from '/Users/spencer/mountain/suffix-thumb/src/dumb/getScore.js'

// import adj from '/Users/spencer/mountain/de-compromise/data/models/adjectives/comparatives.js'
// import adj from '/Users/spencer/mountain/de-compromise/data/models/adjectives/superlatives.js'
// import adj from '/Users/spencer/mountain/de-compromise/data/models/verbs/past-tense.js'
// import pairs from '/Users/spencer/mountain/pt-compromise/tests/plurals.test.js'
// import pairs from '/Users/spencer/mountain/de-compromise/data/models/verbs/past-participle.js'



import dumb from './src/dumb/index.js'

let pairs = adj.map(a => [a[1], a[0]])
// pairs = [
//   ['walk', 'walking'],
//   ['stop', 'stopping'],
//   ['sweep', 'sweeping'],
//   ['stun', 'stunning'],
//   ['stab', 'stabbing'],
//   ['arise', 'arising'],
//   ['encourage', 'encouraging'],
//   ['owe', 'owing'],
//   ['decline', 'declining'],
//   ['compete', 'competing'],
//   ['define', 'defining'],
// ]
// console.log(pairs)
// let pairs = []
// Object.keys(adj).forEach(k => {
//   pairs.push([k, adj[k][1]])
// })
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

let model = dumb(pairs, opts)
// console.log(model)
// console.log(JSON.stringify(model, null, 2))
// classifyTest(input, model)
// console.log(classify('wordi', model))
// let model = learn(pairs, opts)
summarize(model)

// console.log(getScore(pairs, model))
// test(pairs, model)