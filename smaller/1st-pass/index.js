import findBest from './01-find.js'
import getScore from './02-score.js'

const growth = (from, to) => {
  let percent = (to / from - 1) * 100
  return Math.round(percent) + '%'
}

const cull = function (score, pairs) {
  let done = new Set(score.done)
  let len = pairs.length
  pairs = pairs.filter(a => !done.has(a[0]))
  console.log(' minus ' + score.done.length.toLocaleString(), growth(len, pairs.length))
  console.log('    -now  ' + pairs.length.toLocaleString() + '\n')
  return pairs
}


const findRules = function (pairs) {
  let len = pairs.length
  let rules = []
  let already = new Set()
  console.log(findBest(pairs, already))
  const doIt = function () {
    let sub = findBest(pairs, already)[0]
    if (!sub) {
      return pairs
    }
    let score = getScore(sub, pairs)
    rules.push([sub.left, sub.right])
    already.add(sub.left)
    pairs = cull(score, pairs)
    doIt() //recurse
  }
  // kick it off
  doIt()
  rules = rules.reverse()
  console.log(`removed ${len - pairs.length} exceptions with ${rules.length} rules`)
  return { rules, exceptions: pairs }
}


export default findRules
