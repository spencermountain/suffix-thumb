import convert from '../convert/index.js'
import reverse from '../reverse/index.js'
import findRules from './01-findRules.js'

const swap = (a) => [a[1], a[0]]

const revRules = function (pairs, model, threshold) {
  let revModel = reverse(model)
  let remain = pairs.map(swap).filter(pair => convert(pair[0], revModel) !== pair[1])

  // generate additional rules, for remaining reversed pairs
  let newRules = findRules(remain, threshold)
  // merge new rules into model
  model.rev = newRules.fwd
  // merge exceptions, too
  model.ex = model.ex || {}
  Object.keys(newRules.ex).forEach(from => {
    let to = newRules.ex[from]
    model.ex[from] = to
  })
  return model
}
export default revRules