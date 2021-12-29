const collision = function (min, others) {
  return others.some(str => str.endsWith(min))
}

const splitOn = (str, i) => {
  return [str.substring(0, i), str.substring(i)]
}

// how small can we make this word, until there's a collision
const shrink = function (word, val, already, others) {
  let min = word
  for (let i = 1; i < word.length - 1; i += 1) {
    let [pre, post] = splitOn(word, i)
    // key-val not a substring anymore
    if (pre !== val.substring(0, i)) {
      return min
    }
    if (already.hasOwnProperty(post) || collision(post, others) === true) {
      return min
    }
    min = post
  }
  return min
}

const getSuffix = function (str, word, min) {
  let diff = word.length - min.length
  return str.substring(diff)
}

// convert exceptions to suffix rules, when possible
const toRules = function (model, pairs) {
  let already = model.rules.reduce((h, a) => {
    h[a[0]] = a[1]
    return h
  }, {})
  let others = pairs.map(a => a[0])
  Object.entries(model.exceptions).forEach((a, n) => {
    let [word, val] = a
    let rest = others.filter(s => s !== word)
    let suffix = shrink(word, val, already, rest)
    let pair = getSuffix(val, word, suffix)
    if (suffix !== word) {
      // console.log('+', suffix, pair)
      model.rules.push([suffix, pair])
      already[suffix] = pair
      delete model.exceptions[word]
    }
  })
  let after = Object.keys(model.exceptions).length
  // console.log(before, '->', after)
  // re-sort the rules
  model.rules = model.rules.sort((a, b) => {
    if (a[0].length > b[0].length) {
      return -1
    } else if (a[0].length < b[0].length) {
      return 1
    }
    return 0
  })
  return model
}
export default toRules