const convert = function (word, model) {
  // check list of irregulars
  if (model.exceptions.hasOwnProperty(word)) {
    return model.exceptions[word]
  }
  // try suffix rules
  for (let i = 0; i < model.rules.length; i += 1) {
    let suffix = model.rules[i][0]
    if (word.endsWith(suffix)) {
      let reg = new RegExp(suffix + '$')
      return word.replace(reg, model.rules[i][1])
    }
  }
  return null
}
module.exports = convert
