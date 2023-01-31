import convert from '../convert/index.js'
import reverse from '../reverse/index.js'
import findRules from './01-findRules.js'

const swap = (a) => [a[1], a[0]]

const revRules = function (pairs, model, threshold) {
  let revModel = reverse(model)
  // generate additional rules, for remaining reversed pairs
  let rev = pairs.map(swap)
  let remain = rev.filter(pair => convert(pair[0], revModel) !== pair[1])
  let newRules = findRules(remain, rev, threshold)
  // merge new rules into model
  model.rev = newRules.fwd
  // merge exceptions, too
  model.ex = model.ex || {}
  Object.keys(newRules.ex).forEach(from => {
    let to = newRules.ex[from]
    model.ex[to] = from
  })
  return model
}
export default revRules