import { learn, convert, compress, uncompress } from './src/index.js'
// import pairs from './test/data/fr-nous.js'
import fs from 'fs'

let pairs = [
  // ['walk', 'walked'],
  // ['talk', 'talked'],

  // ['spied', 'spy'],
  // ['tried', 'try'],

  // ['sportscart', 'sportscrazy']
  // ['smoked', 'smoke'],
  // ['apaiser', 'apaiserai'],
  // ['apanager', 'apanagerai'],
  // ['apercevoir', 'apercevrai'],
  // ['avoir', 'aurai'],
  // ['avoisiner', 'avoisinerai'],

  // ['automaintenir', 'automaintenirai'],
  // ['contenir', 'contiendrai'],

  ['walk', 'walking'],
  ['smoke', 'smoking'],
  ['create', 'creating'],
  ['talk', 'talking'],
]
// import future from './test/data/future-simple.js'
// pairs = future

let model = learn(pairs)
// model = compress(model)

console.dir(model, { depth: 5 })

// model = uncompress(model)
// console.log(convert('cried', model))

console.log('errors:')
pairs.forEach((a) => {
  let created = convert(a[0], model)
  if (created !== a[1]) {
    console.log('err', a, created)
  }
})
console.log('   -done')
