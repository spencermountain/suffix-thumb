import { learn, test, reverse, convert, compress } from './src/index.js'
import summarize from './tmp/index.js'


// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-words.js' //0.3kb
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/future-simple.js' //1.6kb
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js' //4.5kb
import pairs from '/Users/spencer/mountain/compromise/data/pairs/Gerund.js'//5kb, 5s


let opts = {
  threshold: 0.8,
  reverse: true
}

// let pairs = [
//   ['agatiser', 'agatiserai'],
//   ['agencer', 'agencerai'],
//   ['agenouiller', 'agenouillerai'],
//   ['agneler', 'agnellerai'],
//   ['agonir', 'agonirai'],
//   ['agoniser', 'agoniserai'],
//   ['agrafer', 'agraferai'],
//   ['agrandir', 'agrandirai'],
//   ['amollir', 'amollirai'],
//   ['amonceler', 'amoncellerai'],
//   ['amorcer', 'amorcerai'],
//   ['ankyloser', 'ankyloserai'],
//   ['anneler', 'annellerai'],
//   ['appauvrir', 'appauvrirai'],
//   ['appeler', 'appellerai'],
//   ['attaquer', 'attaquerai'],
//   ['attarder', 'attarderai'],
//   ['atteler', 'attellerai'],
//   ['attenter', 'attenterai'],
//   ['autocentrer', 'autocentrerai'],
//   ['autodévelopper', 'autodévelopperai'],
//   ['autodiscipliner', 'autodisciplinerai'],
//   ['autoévaporiser', 'autoévaporiserai'],
//   ['autofinancer', 'autofinancerai'],
//   ['balancer', 'balancerai'],
//   ['balayer', 'balayerai'],
// ]
// pairs = [
//   ['neighbouring', 'neighbour'],
//   ['colouring', 'colour'],
//   ['flavouring', 'flavour'],
//   ['touring', 'tour'],
//   ['scouring', 'scour'],
//   ['honouring', 'honour'],
//   ['favouring', 'favour'],
//   ['labouring', 'labour'],
//   ['devouring', 'devour'],
//   ['harbouring', 'harbour'],
//   ['clamouring', 'clamour'],
//   ['pouring', 'pour'],
//   ['autodévelopper', 'autodévelopperai'],
//   ['autodiscipliner', 'autodisciplinerai'],
//   ['autoévaporiser', 'autoévaporiserai'],
//   ['autofinancer', 'autofinancerai'],
//   ['balancer', 'balancerai'],
//   ['balayer', 'balayerai'],
//   ['contouring', 'contour'],
//   ['endeavouring', 'endeavour']
// ]

let model = learn(pairs)
console.log(summarize(model))
// console.log(reverse(model))
// console.log('----')
// console.log(model)
// console.log(reverse(model))
test(pairs, model)