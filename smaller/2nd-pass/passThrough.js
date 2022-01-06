const max = 6

// words we've addressed
const findGone = function (pairs, exceptions) {
  let still = new Set(exceptions.map(a => a[0]))
  let gone = pairs.filter(a => !still.has(a[0]))
  gone = gone.map(a => a[0])
  return gone
}


const getSuffixes = function (str = '') {
  let list = []
  for (let i = max; i >= 0; i -= 1) {
    if (str.length - 1 <= i) {
      continue
    }
    let n = str.length - i - 1
    let suffix = str.substring(n, n + str.length - 1)
    list.push(suffix)
  }
  return list
}

// smallest non-colliding suffix
const unProblematic = function (suffs, gone) {
  suffs = suffs.reverse()
  for (let i = 0; i < suffs.length; i += 1) {
    if (!gone.some(str => str.endsWith(suffs[i]))) {
      return suffs[i]
    }
  }
  return null
}

const hasHit = function (str, rules) {
  return rules.find(a => str.endsWith(a[0]))
}

// find words that don't change
const findStatic = function (rules, exceptions, pairs) {
  let newRules = 0
  let len = exceptions.length
  let gone = findGone(pairs, exceptions)
  let sames = exceptions.filter(a => a[0] === a[1])
  let captured = {}
  // only the problematic sames
  sames = sames.filter(a => hasHit(a[0], rules))
  let unChanged = {}
  sames.forEach(a => {
    let suffs = getSuffixes(a[0])
    let suff = unProblematic(suffs, gone)
    if (suff) {
      unChanged[suff] = true
      captured[a[0]] = true
      newRules += 1
    }
  })
  // add new suffixes to our rules
  Object.keys(unChanged).forEach(k => {
    rules.unshift([k, k, '-'])
  })
  // remove these words from our list of exceptions
  exceptions = exceptions.filter(a => captured[a[0]] !== true)
  // console.log(`removed ${len - exceptions.length} exceptions with ${newRules} new rules`)
  // console.log(`   now ${exceptions.length}`)
  return { rules, exceptions }
}


export default findStatic
