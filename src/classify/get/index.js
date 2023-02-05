const get = function (str, model) {
  // check exceptions
  if (model.ex.hasOwnProperty(str)) {
    return model.ex[str]
  }
  // check suffix rules
  let len = str.length
  for (let i = 1; i < len - 1; i += 1) {
    let end = str.substring(len - i)
    if (model.ends[end] !== undefined && model.ends.hasOwnProperty(end)) {
      return model.ends[end]
    }
  }
  return null
}
export default get