import { sections, encodeVal } from './_lib.js'

// write a list of keys as a suffix-trie:
//    ltador, nzador, epador   →   ador{lt,nz,ep}
//    ero, ntonero             →   ero{,nton}      (an empty entry means the shared suffix is itself a key)
// a suffix is only factored-out when the braces pay for themselves.
const packKeys = function (keys) {
  let root = { kids: new Map(), end: false }
  keys.forEach(k => {
    let n = root
    for (let i = k.length - 1; i >= 0; i -= 1) {
      if (!n.kids.has(k[i])) {
        n.kids.set(k[i], { kids: new Map(), end: false })
      }
      n = n.kids.get(k[i])
    }
    n.end = true
  })
  // every key beneath a node, written out in full
  const flat = function (n, suff) {
    let out = n.end ? [suff] : []
    n.kids.forEach((kid, char) => out.push(...flat(kid, char + suff)))
    return out
  }
  const pack = function (n) {
    let parts = n.end && n.kids.size > 0 ? [''] : []
    n.kids.forEach((kid, char) => {
      // collapse single-child chains into one string
      let chain = char
      while (!kid.end && kid.kids.size === 1) {
        let [[c, k]] = kid.kids
        chain = c + chain
        kid = k
      }
      let nested = chain + (kid.kids.size > 0 ? '{' + pack(kid) + '}' : '')
      let plain = flat(kid, chain).join(',')
      parts.push(plain.length <= nested.length ? plain : nested)
    })
    return parts.join(',')
  }
  return pack(root)
}

// group keys by their encoded value:   1as:chico,chino|2es:ton,ger
const packSection = function (obj = {}) {
  let byVal = new Map()
  Object.keys(obj).forEach(k => {
    let val = encodeVal(k, obj[k])
    if (!byVal.has(val)) {
      byVal.set(val, [])
    }
    byVal.get(val).push(k)
  })
  return [...byVal].map(([val, keys]) => val + ':' + packKeys(keys)).join('|')
}

// model → one string
const compress = function (model = {}) {
  return sections.map(s => packSection(model[s])).join('~')
}
export default compress
