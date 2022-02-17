import { indexRules, unIndex } from '../../_lib.js'
import { trimPairs } from '../02-trim/index.js'
import { replace, match } from '../lib.js'

const spin = function (arr) {
  return arr.map(a => [a[1], a[0]])
}

const findIssues = function (model, pairs) {
  let resolved = []
  // reverse pairs
  pairs = spin(pairs)
  // reverse rules
  let fwdRules = spin(model.rules)

  // handle exceptions
  let issues = pairs.filter(pair => {
    if (model.exceptions.hasOwnProperty(pair[1])) {
      resolved.push(pair)
      return false
    }
    return true
  })
  // handle rules
  issues = issues.filter(pair => {
    let [left, right] = pair
    let rule = fwdRules.find(r => match(left, r[0]))
    if (!rule) {
      return true // still an issue
    }
    if (replace(left, rule[0], rule[1]) === right) {
      resolved.push(pair)
      return false //seems fine
    }
    return true
  })
  console.log('✓', resolved.length, ' : ', issues.length, 'issues')
  return { resolved, issues }
}


export default findIssues