import { sections, decodeVal } from './_lib.js'

// suffix-trie → list of keys
const unpackKeys = function (str, suff = '', out = []) {
  let i = 0
  do {
    let chain = ''
    while (i < str.length && str[i] !== ',' && str[i] !== '{') {
      chain += str[i]
      i += 1
    }
    if (str[i] === '{') {
      // find the matching brace
      let depth = 1
      let j = i + 1
      while (depth > 0) {
        if (str[j] === '{') {
          depth += 1
        } else if (str[j] === '}') {
          depth -= 1
        }
        j += 1
      }
      unpackKeys(str.slice(i + 1, j - 1), chain + suff, out)
      i = j
    } else {
      out.push(chain + suff)
    }
    i += 1 // step over the comma
  } while (i <= str.length)
  return out
}

const unpackSection = function (str = '') {
  let obj = {}
  if (!str) {
    return obj
  }
  str.split('|').forEach(group => {
    let i = group.indexOf(':')
    let val = group.slice(0, i)
    unpackKeys(group.slice(i + 1)).forEach(k => {
      obj[k] = decodeVal(k, val)
    })
  })
  return obj
}

// one string → model
const uncompress = function (str = '') {
  if (typeof str !== 'string' || str[0] === '{') {
    throw new Error('suffix-thumb: uncompress expects a packed string. Models made before v6 must be learned again.')
  }
  let parts = str.split('~')
  let model = {}
  sections.forEach((s, i) => {
    model[s] = unpackSection(parts[i])
  })
  return model
}
export default uncompress
