import { learn, test, reverse, convert } from './src/index.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-words.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/future-simple.js'
let opts = {
  threshold: 0.8,
  reverse: true
}

let pairs = [
  ['être', 'serons'],
  ['agatiser', 'agatiserai'],
  ['agencer', 'agencerai'],
  ['agenouiller', 'agenouillerai'],
  ['agneler', 'agnellerai'],
  ['agonir', 'agonirai'],
  ['agoniser', 'agoniserai'],
  ['agrafer', 'agraferai'],
  ['agrandir', 'agrandirai'],
  ['amollir', 'amollirai'],
  ['amonceler', 'amoncellerai'],
  ['amorcer', 'amorcerai'],
  ['ankyloser', 'ankyloserai'],
  ['anneler', 'annellerai'],
  ['appauvrir', 'appauvrirai'],
  ['appeler', 'appellerai'],
  ['attaquer', 'attaquerai'],
  ['attarder', 'attarderai'],
  ['atteler', 'attellerai'],
  ['attenter', 'attenterai'],
  ['autocentrer', 'autocentrerai'],
  ['autodévelopper', 'autodévelopperai'],
  ['autodiscipliner', 'autodisciplinerai'],
  ['autoévaporiser', 'autoévaporiserai'],
  ['autofinancer', 'autofinancerai'],
  ['balancer', 'balancerai'],
  ['balayer', 'balayerai'],
]

let model = learn(pairs)
console.log(model)
// console.log(reverse(model))
// console.log('----')
// console.log(model)
// console.log(reverse(model))
test(pairs, model)