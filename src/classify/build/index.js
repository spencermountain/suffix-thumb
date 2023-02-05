import consider from './consider.js'

const getSuffix = function (str, size) {
  if (size > str.length) {
    return ''
  }
  let len = str.length
  return str.substring(len - size)
}


const classify = function (input, opts = {}) {
  let pairs = Object.entries(input)
  let threshold = opts.threshold || 80
  let min = opts.min || 0
  let ends = {}
  let pending = pairs.slice(0)
  let finished = []
  // small rules first
  for (let size = 1; size < 6; size += 1) {
    for (let i = 0; i < pending.length; i += 1) {
      let [word, tag] = pending[i]
      let end = getSuffix(word, size)
      let res = consider(end, tag, pending)
      // is it okay?
      if (res.percent > threshold && res.count > min) {
        // ensure it does not conflict with any old ones
        let res2 = consider(end, tag, finished)
        if (res2.percent === 100) {
          // add suffix rule to our list
          ends[end] = tag
          // remove any now-cleared pairs
          pending = pending.filter(p => {
            if (res.clear.has(p[0])) {
              finished.push(p)
              return false
            }
            return true
          })
          continue
        }
      }
    }
  }
  // are there any left?
  let ex = {}
  pending.forEach(p => {
    ex[p[0]] = p[1]
  })
  return { ends, ex }
}
export default classify