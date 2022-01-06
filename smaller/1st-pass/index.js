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
  let rules = []
  const doIt = function () {
    let sub = findBest(pairs)[0]
    if (!sub) {
      return pairs
    }
    let score = getScore(sub, pairs)
    rules.push([sub.left, sub.right])
    pairs = cull(score, pairs)
    doIt() //recurse
  }
  // kick it off
  doIt()
  return { rules, exceptions: pairs }
}


export default findRules
