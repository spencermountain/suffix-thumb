import { learn, convert, compress, uncompress, reverse, validate } from './src/index.js'
// import pairs from './test/data/fr-nous.js'
// import fs from 'fs'
let pairs = [
  // ['walk', 'walked'],
  // ['talk', 'talked'],

  // ['spied', 'spy'],
  // ['tried', 'try'],

  // ['reconditioning', 'recondition'],
  // ['dehorning', 'dehorn'],
  // ['poisoning', 'poison'],
  // ['portioning', 'portion'],
  // ['margining', 'margin'],
  // ['auctioning', 'auction'],
  // ['slackening', 'slacken'],
  // ['adjoining', 'adjoin'],
  // ['rezoning', 'rezon'],
  // ['enjoining', 'enjoin'],
  // ['ever-widening', 'ever-widen'],
  // ['hastening', 'hasten'],
  // ['saddening', 'sadden'],
  // ['crowning', 'crown'],
  // ['disdaining', 'disdain'],
  // ['steepening', 'steepen'],
  // ['cushioning', 'cushion'],
  // ['disheartening', 'dishearten'],
  // ['likening', 'liken'],
  // ['awakening', 'awaken'],
  // ['chaperoning', 'chaperon'],
  // ['abstaining', 'abstain'],



  // ['relearning', 'relearn'],
  // ['gleaning', 'glean'],
  // ['nonthreatening', 'nonthreaten'],
  // ['non-threatening', 'non-threaten'],
  // ['reassigning', 'reassign'],
  // ['fractioning', 'fraction'],
  // ['sharpening', 'sharpen'],
  // ['stationing', 'station'],
  // ['consigning', 'consign'],
  // ['loaning', 'loan'],
  // ['evening', 'even'],
  // ['auditioning', 'audition'],
  // ['late-evening', 'late-even'],
  // ['detaining', 'detain'],
  // ['reconvening', 'reconven'],
  // ['campaigning', 'campaign'],

  // // exceptions
  // ['binning', 'bin'],
  // ['boning', 'bone'],
  // ['pinning', 'pin'],
  // ['sidelining', 'sideline'],
  // ['planing', 'plane'],
  // ['intertwining', 'intertwine'],
  // ['donning', 'don'],
  // ['headlining', 'headline'],
  // ['entwining', 'entwine'],

  // ["revokes", "revoke"],
  // ["accedes", "accede"],
  ["juxtaposes", "juxtapose"],
  ["crafted", "be"],
  ["unclear", "be"],
  ["divided", "be"],
  // ["be", "be"],



]
// import vbg from '/Users/spencer/mountain/minimum-model/pairs/JJR.js'
// import nous from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'
// pairs = Object.entries(vbg)
// console.log(pairs)
pairs = validate(pairs,)
// console.log(pairs)


let model = learn(pairs)
let rev = reverse(model)

// model = compress(model)
// console.dir(model, { depth: 5 })
// model = uncompress(model)

// console.dir(rev, { depth: 5 })
// console.log('   ', Object.keys(model.rules).length, 'rules', Object.keys(model.exceptions).length, 'exceptions')

// console.log(convert('unclear', model))

// pairs.forEach((a) => {
//   let created = convert(a[0], model)
//   if (created !== a[1]) {
//     console.log('error:', a, created)
//   }
// })

// test reverse, too
let wrong = 0
pairs.forEach((a) => {
  let created = convert(a[1], rev)
  if (created !== a[0]) {
    wrong += 1
    console.log('rev:', a, created)
  }
})
const percent = (part, total) => {
  let num = (part / total) * 100;
  num = Math.round(num * 10) / 10;
  return num + '%'
};
console.log(percent(wrong, pairs.length))