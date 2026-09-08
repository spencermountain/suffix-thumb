const flipObj = function (obj = {}) {
  return Object.entries(obj).reduce((h, a) => {
    h[a[1]] = a[0]
    return h
  }, {})
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
