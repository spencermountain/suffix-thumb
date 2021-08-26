const prefix = /^.([0-9]+)/

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

// handle compressed form of key-value pair
const getKeyVal = function (word, model) {
  let val = model.exceptions[word]
  let m = val.match(prefix)
  if (m === null) {
    // return not compressed form
    return model.exceptions[word]
  }
  // uncompress it
  let num = Number(m[1]) || 0
  let pre = word.substr(0, num)
  return pre + val.replace(prefix, '')
}

// support old uncompressed format
const getRules = function (word, model) {
  if (isArray(model.rules)) {
    return model.rules
  }
  let char = word[word.length - 1]
  let rules = model.rules[char] || []
  if (rules.length === 0) {
    // do we have a generic suffix?
    rules = model.rules[''] || rules
  }
  return rules
}

const convert = function (word, model) {
  // check list of irregulars
  if (model.exceptions.hasOwnProperty(word)) {
    return getKeyVal(word, model)
  }
  // try suffix rules
  const rules = getRules(word, model)
  for (let i = 0; i < rules.length; i += 1) {
    let suffix = rules[i][0]
    if (word.endsWith(suffix)) {
      let reg = new RegExp(suffix + '$')
      return word.replace(reg, rules[i][1])
    }
  }
  return null
}
export default convert
