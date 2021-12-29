const squeeze = function (arr) {
  let redundant = {}
  // remove any redundant downstream
  arr.forEach((o, i) => {
    let downstream = arr.slice(i + 1, arr.length)
    downstream.forEach((d) => {
      if (d.from.endsWith(o.from)) {
        // also ensure the surviving one has no exceptions
        if (d.no === 0) {
          redundant[d.from] = true
        }
      }
    })
  })
  // actually remove any redundant suffixes
  arr = arr.filter((o) => {
    return redundant.hasOwnProperty(o.from) === false
  })
  return arr
}
export default squeeze
