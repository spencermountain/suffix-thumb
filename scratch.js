import { learn, convert, compress, uncompress } from './src/index.js'
// import pairs from './test/data/fr-nous.js'
// import fs from 'fs'
let pairs = [
  // ['walk', 'walked'],
  // ['talk', 'talked'],

  // ['spied', 'spy'],
  // ['tried', 'try'],

  // ['sportscart', 'sportscrazy'],
  // ['smoked', 'smoke'],
  // ['apaiser', 'apaiserai'],
  // ['apanager', 'apanagerai'],
  // ['apercevoir', 'apercevrai'],
  // ['avoir', 'aurai'],
  // ['avoisiner', 'avoisinerai'],

  // ['automaintenir', 'automaintenirai'],
  // ['contenir', 'contiendrai'],

  // ['walk', 'walking'],
  // ['smoke', 'smoking'],
  // ['create', 'creating'],
  // ['talk', 'talking'],

  ['neighbouring', 'neighbour'],
  ['colouring', 'colour'],
  ['flavouring', 'flavour'],
  ['touring', 'tour'],
  ['scouring', 'scour'],
  ['honouring', 'honour'],
  ['favouring', 'favour'],
  ['labouring', 'labour'],
  ['devouring', 'devour'],
  ['harbouring', 'harbour'],
  ['clamouring', 'clamour'],
  ['pouring', 'pour'],
  ['contouring', 'contour'],
  ['endeavouring', 'endeavour']
]
// import vbg from '/Users/spencer/mountain/minimum-model/pairs/VBG.js'
// pairs = Object.entries(vbg)

// import future from './test/data/future-simple.js'
// pairs = future

let model = learn(pairs)

// model = compress(model)
console.dir(model, { depth: 5 })
// console.log('   ', Object.keys(model.rules).length, 'rules', Object.keys(model.exceptions).length, 'exceptions')

// model = uncompress(model)
// model = uncompress(model)

// console.log('errors:')
// pairs.forEach((a) => {
//   let created = convert(a[0], model)
//   if (created !== a[1]) {
//     console.log('err', a, created)
//   }
// })
// console.log('   -done')
