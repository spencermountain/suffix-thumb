const hasHit = function (str, rules) {
  return rules.find(a => str.endsWith(a[0]))
}

// remove unchanged-exceptions with no hits
const passThrough = function (rules, exceptions) {
  let len = exceptions.length
  // remove unchanged pairs, with no rule-hits
  exceptions = exceptions.filter(a => {
    if (a[0] === a[1] && !hasHit(a[0], rules)) {
      return false
    }
    return true
  })
  console.log(`removed ${len - exceptions.length} exceptions clean pass-through`)
  console.log(`   now ${exceptions.length}`)
  return { rules, exceptions }
}

export default passThrough