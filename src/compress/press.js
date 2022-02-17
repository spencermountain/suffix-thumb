// longest common prefix
const findOverlap = (from, to) => {
  let all = []
  for (let i = 0; i < from.length; i += 1) {
    if (from[i] === to[i]) {
      all.push(from[i])
    } else {
      break
    }
  }
  return all.join('')
}

let compress = function (key, val) {
  let prefix = findOverlap(key, val)
  if (prefix.length < 1) {
    return [key, val]
  }
  let out = prefix.length + val.substr(prefix.length)
  return [key, out]
}

export default compress
// console.log(compress('fixture', 'fixturing'))