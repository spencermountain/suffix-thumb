
// get suffix-rules according to last char of word
const getRules = function (word, model) {
  let char = word[word.length - 1]
  let rules = model.rules[char] || []
  if (rules.length === 0) {
    // do we have a generic suffix?
    rules = model.rules[''] || rules
  }
  return rules
}

const debug = function (word, model) {
  if (model.exceptions.hasOwnProperty(word)) {
    let obj = {}
    obj[word] = model.exceptions[word]
    return { found: 'exception', exception: obj }
  }
  const rules = getRules(word, model)
  for (let i = 0; i < rules.length; i += 1) {
    let suffix = rules[i][0]
    if (word.endsWith(suffix)) {
      return { found: 'rule', rule: rules[i] }
    }
  }
  return { found: null }
}
export default debug