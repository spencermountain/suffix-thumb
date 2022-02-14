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

const sortRules = function (rules) {
  let all = []
  rules.forEach(a => {
    if (a[0]) {
      all.push([a[0], 'Left', a[1]])
    }
    if (a[1].length > 1) {
      all.push([a[1], 'Right', a[0]])
    }
  })
  return all.sort((a, b) => {
    if (a[0].length > b[0].length) {
      return -1
    } else if (a[0].length < b[0].length) {
      return 1
    }
    return 0
  })
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
  let rules = getRules(str, model)
  rules = sortRules(rules)
  for (let i = 0; i < rules.length; i += 1) {
    let [suff, side] = rules[i]
    if (str.endsWith(suff)) {
      if (debug === true) {
        // console.log(rules[i])
      }
      return side
    }
  }
  return null
}
export default classify