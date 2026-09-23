import { sections, decodeVal, reserved } from './_lib.js'

const invalid = function () {
  throw new Error('suffix-thumb: invalid packed model')
}

// suffix-trie → list of keys
const unpackKeys = function (str, suff = '', out = []) {
  let i = 0
  do {
    let chain = ''
    while (i < str.length && str[i] !== ',' && str[i] !== '{') {
      chain += str[i]
      i += 1
    }
    if (reserved.test(chain)) {
      invalid()
    }
    if (str[i] === '{') {
      // find the matching brace
      let depth = 1
      let j = i + 1
      while (depth > 0 && j < str.length) {
        if (str[j] === '{') {
          depth += 1
        } else if (str[j] === '}') {
          depth -= 1
        }
        j += 1
      }
      if (depth !== 0 || (j < str.length && str[j] !== ',')) {
        invalid()
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
  const obj = Object.create(null)
  if (!str) {
    return { ...obj }
  }
  str.split('|').forEach(group => {
    const i = group.indexOf(':')
    const val = group.slice(0, i)
    const count = val.match(/^[0-9]+/)
    if (i < 0 || !count || reserved.test(val.slice(count[0].length))) {
      invalid()
    }
    unpackKeys(group.slice(i + 1)).forEach(k => {
      if (Number(count[0]) > k.length) {
        invalid()
      }
      obj[k] = decodeVal(k, val)
    })
  })
  return { ...obj }
}

// one string → model
const uncompress = function (str = '') {
  if (typeof str !== 'string' || str[0] === '{') {
    throw new Error('suffix-thumb: uncompress expects a packed string. Models made before v6 must be learned again.')
  }
  const parts = str.split('~')
  // Preserve the empty/default input shorthand for an empty model.
  if (str !== '' && parts.length !== sections.length) {
    invalid()
  }
  const model = {}
  sections.forEach((s, i) => {
    model[s] = unpackSection(parts[i])
  })
  return model
}
export default uncompress
