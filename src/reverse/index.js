const flipObj = function (obj = {}) {
  return Object.fromEntries(Object.entries(obj).map(([key, val]) => [val, key]))
}

// swap the direction of a model
const reverse = function (model = {}) {
  return {
    reversed: true,
    // these two work both ways
    both: flipObj(model.both),
    ex: flipObj(model.ex),
    // and the one-way rules trade places
    fwd: model.rev || {},
    rev: model.fwd || {},
  }
}
export default reverse
