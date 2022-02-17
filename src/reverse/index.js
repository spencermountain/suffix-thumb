const reverseObj = function (obj) {
  return Object.entries(obj).reduce((h, a) => {
    h[a[1]] = a[0]
    return h
  }, {})
}

const reverse = function (model) {
  let { rules, exceptions, rev } = model
  exceptions = reverseObj(exceptions)
  return {
    reversed: !Boolean(model.reversed),//toggle this
    rules,
    exceptions,
    rev
  }
}
export default reverse