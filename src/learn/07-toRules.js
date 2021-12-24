const reverse = (str) => str.split('').reverse().join('')

const suffixSort = function (arr) {
  return arr.sort((a, b) => {
    if (a.length > b.length) {
      return -1
    } else if (a.length < b.length) {
      return 1
    }
    a = reverse(a)
    b = reverse(b)
    if (a > b) {
      return 1
    } else if (a < b) {
      return -1
    }
    return 0
  })
}

const isAlone = function (min, w, others) {
  return others.some(str => str.endsWith(min))
}
const splitOn = (str, i) => [str.substring(0, i), str.substring(i)]

// how small can we make this word, until there's a collision
const shrink = function (word, val, already, others) {
  let min = word
  for (let i = 1; i < word.length - 1; i += 1) {
    let [pre, post] = splitOn(word, i)
    // key-val not a substring anymore
    if (pre !== val.substring(0, i)) {
      return min
    }
    if (already.hasOwnProperty(post) || !isAlone(post, word, others)) {
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
const toRules = function (model) {
  let already = model.rules.reduce((h, a) => {
    h[a[0]] = a[1]
    return h
  }, {})
  let others = Object.keys(model.exceptions)
  // others = suffixSort(others)
  // console.log(JSON.stringify(others, null, 2))
  Object.entries(model.exceptions).forEach((a, n) => {
    let [word, val] = a
    let rest = others.filter(s => s !== word)
    // console.log(word + '|', rest)
    let suffix = shrink(word, val, already, rest)
    let pair = getSuffix(val, word, suffix)
    if (suffix !== word) {
      model.rules.push([suffix, pair])
      already[suffix] = pair
      delete model.exceptions[word]
    }
  })
  return model
}
export default toRules