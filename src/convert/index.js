const prefix = /^.([0-9]+)/

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

// get suffix-rules according to last char of word
const getRules = function (word, rules = {}) {
  let char = word[word.length - 1]
  let list = rules[char] || []
  // do we have a generic suffix?
  if (rules['']) {
    list = list.concat(rules[''])
  }
  return list
}

const convert = function (word, model, debug) {
  // check list of irregulars
  if (model.exceptions.hasOwnProperty(word)) {
    if (debug) {
      console.log("exception, ", word, model.exceptions[word])
    }
    return getKeyVal(word, model)
  }
  // if model is reversed, try rev rules
  let rules = model.rules
  if (model.reversed) {
    rules = model.rev
  }
  // try suffix rules
  rules = getRules(word, rules)
  for (let i = 0; i < rules.length; i += 1) {
    let suffix = rules[i][0]
    if (word.endsWith(suffix)) {
      if (debug) {
        console.log("rule, ", rules[i])
      }
      let reg = new RegExp(suffix + '$')
      return word.replace(reg, rules[i][1])
    }
  }
  if (debug) {
    console.log(' x - ' + word)
  }
  // return the original word unchanged
  return word
}
export default convert
