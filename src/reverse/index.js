const reverseObj = function (obj) {
  return Object.entries(obj).reduce((h, a) => {
    h[a[1]] = a[0]
    return h
  }, {})
}

const reverse = function (model) {
  let tmp = model.fwd
  return {
    reversed: !Boolean(model.reversed),
    // swap fwd+bkwd
    fwd: model.bkwd,
    bkwd: tmp,
    // reverse these two
    both: reverseObj(model.both),
    ex: reverseObj(model.ex),
  }
}
export default reverse