import convert from '../convert.js'
import reverse from '../../reverse/index.js'
import secondPass from '../02-longer/index.js'


const addRev = function (pairs, model) {
  let rev = reverse(model)
  let revRules = []
  pairs = pairs.map(a => [a[1], a[0]])
  pairs.forEach(a => {
    let [from, to] = a
    if (convert(from, rev) === to) {
      return // it's good
    }

    let more = secondPass(from, to, pairs)
    if (more) {
      let len = more.from.length
      revRules[len] = revRules[len] || {}
      revRules[len][more.from] = more.to
    }
  })
  return revRules
}
export default addRev