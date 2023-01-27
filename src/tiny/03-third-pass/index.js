
const combine = function (model) {
  Object.entries(model.fwd).forEach(a => {
    let [k, val] = a
    if (model.bkwd[val] === k) {
      model.both[k] = val
      delete model.fwd[k]
      delete model.bkwd[val]
    }
  })
  return model
}
export default combine