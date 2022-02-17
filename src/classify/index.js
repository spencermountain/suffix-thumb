// get suffix-rules according to last char of word
const getRules = function (word, modelRules) {
  let char = word[word.length - 1]
  let rules = modelRules[char] || []
  // if (modelRules['']) {
  //   // do we have a generic suffix?
  //   rules = rules.concat(modelRules[''])
  // }
  return rules
}


const classify = function (str, model, debug) {
  const l = 'Left'
  const r = 'Right'
  // check known exceptions
  if (model.exceptions.hasOwnProperty(str)) {
    return l
  }
  let list = Object.entries(model.exceptions)
  for (let i = 0; i < list.length; i += 1) {
    if (list[i][1] === str) {
      return r
    }
  }
  // check rules
  let rules = getRules(str, model.rules)
  for (let i = 0; i < rules.length; i += 1) {
    if (str.endsWith(rules[i][0])) {
      return l
    }
  }
  rules = getRules(str, model.rev)
  for (let i = 0; i < rules.length; i += 1) {
    if (str.endsWith(rules[i][0])) {
      return r
    }
  }
  // check weak-side of rules
  rules = getRules(str, model.rules)
  for (let i = 0; i < rules.length; i += 1) {
    if (str.endsWith(rules[i][1])) {
      return r
    }
  }
  rules = getRules(str, model.rev)
  for (let i = 0; i < rules.length; i += 1) {
    if (str.endsWith(rules[i][1])) {
      return l
    }
  }
  return null
}
export default classify