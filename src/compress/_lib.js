// the four parts of a model, in the order they are packed
const sections = ['fwd', 'both', 'rev', 'ex']

// characters with a meaning in the packed format - words containing these cannot be learned
const reserved = /[~|:,{}0-9]/

// a value is stored relative to its key:
//   'chico' → 'chicas'  is  '1as'  (drop one char, add 'as')
//   'er' → 'é'          is  '2é'
const encodeVal = function (key, val) {
  let i = 0
  while (i < key.length && i < val.length && key[i] === val[i]) {
    i += 1
  }
  return String(key.length - i) + val.slice(i)
}

const decodeVal = function (key, str) {
  let m = str.match(/^[0-9]+/)
  let n = m ? Number(m[0]) : 0
  let tail = m ? str.slice(m[0].length) : str
  return key.slice(0, key.length - n) + tail
}

export { sections, reserved, encodeVal, decodeVal }
