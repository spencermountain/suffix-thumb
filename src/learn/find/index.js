import convert from '../lib/convert.js'
import bestRule from './getRule.js'

const magenta = str => '\x1b[35m' + str + '\x1b[0m'
const yellow = str => '\x1b[33m' + str + '\x1b[0m'


const findRules = function (pairs, threshold, ex) {
  let rules = {}
  let done = []
  let pending = pairs.slice(0)

  // greediest rules first
  for (let peek = 0; peek < 6; peek += 1) {
    for (let i = 0; i < pending.length; i += 1) {
      let rule = bestRule(pending[i], peek, pending, done, threshold)
      if (rule) {
        rules[rule.from] = rules[rule.from] || rule.to
        pending = pending.filter(pair => convert(pair[0], rule) !== pair[1])
      }
    }
    if (pending.length === 0) {
      break
    }
  }

  // add remaining as exceptions
  pending.forEach(p => {
    ex[p[0]] = p[1]
  })
  return { fwd: rules, ex }
}
export default findRules


// let rule = { from: 'ler', to: 'llerai' }
// let pairs = [
//   ['agatiser', 'agatiserai'],
//   ['agencer', 'agencerai'],
//   ['agenouiller', 'agenouillerai'],
// ]
// console.log(isPerfect(pairs, rule))