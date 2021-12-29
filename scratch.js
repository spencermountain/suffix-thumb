import { learn, convert, compress, uncompress, reverse } from './src/index.js'
// import pairs from './test/data/fr-nous.js'
// import fs from 'fs'
let pairs = [
  // ['walk', 'walked'],
  // ['talk', 'talked'],

  // ['spied', 'spy'],
  // ['tried', 'try'],

  // ['bargaining', 'bargain'],
  // ['binning', 'bin'],
  // ['boning', 'bone'],
  // ['reconditioning', 'recondition'],
  // ['pinning', 'pin'],
  // ['sidelining', 'sideline'],
  // ['dehorning', 'dehorn'],
  // ['poisoning', 'poison'],
  // ['portioning', 'portion'],
  // ['margining', 'margin'],
  // ['auctioning', 'auction'],
  // ['slackening', 'slacken'],
  // ['adjoining', 'adjoin'],
  // ['rezoning', 'rezon'],
  // ['planing', 'plane'],
  // ['enjoining', 'enjoin'],
  // ['intertwining', 'intertwine'],
  // ['ever-widening', 'ever-widen'],
  // ['hastening', 'hasten'],
  // ['saddening', 'sadden'],
  // ['crowning', 'crown'],
  // ['disdaining', 'disdain'],
  // ['steepening', 'steepen'],
  // ['cushioning', 'cushion'],
  // ['donning', 'don'],
  // ['disheartening', 'dishearten'],
  // ['likening', 'liken'],
  // ['awakening', 'awaken'],
  // ['chaperoning', 'chaperon'],
  // ['abstaining', 'abstain'],
  // ['headlining', 'headline'],



  ['relearning', 'relearn'],
  ['gleaning', 'glean'],
  ['nonthreatening', 'nonthreaten'],
  ['non-threatening', 'non-threaten'],
  ['reassigning', 'reassign'],
  ['fractioning', 'fraction'],
  ['sharpening', 'sharpen'],
  ['stationing', 'station'],
  ['consigning', 'consign'],
  ['loaning', 'loan'],
  ['evening', 'even'],
  ['auditioning', 'audition'],
  ['late-evening', 'late-even'],
  ['detaining', 'detain'],
  ['reconvening', 'reconven'],
  ['campaigning', 'campaign'],

  // exceptions
  ['binning', 'bin'],
  ['boning', 'bone'],
  ['pinning', 'pin'],
  ['sidelining', 'sideline'],
  ['planing', 'plane'],
  ['intertwining', 'intertwine'],
  ['donning', 'don'],
  ['headlining', 'headline'],
  ['entwining', 'entwine'],

]
import vbg from '/Users/spencer/mountain/minimum-model/pairs/VBG.js'
// pairs = Object.entries(vbg)

let model = learn(pairs)
let rev = reverse(model)

// model = compress(model)
// model.rules.g.shift()
console.dir(model, { depth: 5 })
console.dir(rev, { depth: 5 })
// console.log('   ', Object.keys(model.rules).length, 'rules', Object.keys(model.exceptions).length, 'exceptions')

// model = uncompress(model)
// model = uncompress(model)
console.log(convert('detain', rev))

pairs.forEach((a) => {
  let created = convert(a[0], model)
  if (created !== a[1]) {
    console.log('error:', a, created)
  }
})

pairs.forEach((a) => {
  let created = convert(a[1], rev)
  if (created !== a[0]) {
    console.log('rev:', a, created)
  }
})
