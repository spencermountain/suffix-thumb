// estimated byte-cost of one `key → val` entry, once packed by ./compress
// (mirrors the run-length prefix encoding in compress/key-val.js)
const cost = function (key, val) {
  let i = 0
  while (i < key.length && i < val.length && key[i] === val[i]) {
    i += 1
  }
  let encoded = i > 0 ? String(i).length + (val.length - i) : val.length
  return key.length + encoded + 2 // separator chars
}
export default cost
