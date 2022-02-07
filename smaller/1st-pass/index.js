import findBest from './01-find.js'
import getScore from './02-score.js'
import getNos from './_nos.js'


const growth = (from, to) => {
  let percent = (to / from - 1) * 100
  return Math.round(percent) + '%'
}

const cull = function (score, pairs) {
  let done = new Set(score.done)
  let len = pairs.length
  pairs = pairs.filter(a => !done.has(a[0]))
  // console.log(' minus ' + score.done.length.toLocaleString(), growth(len, pairs.length))
  // console.log('    -now  ' + pairs.length.toLocaleString() + '\n')
  return pairs
}

const safest = function (subs) {
  return subs.sort((a, b) => {
    if (a.nos.length > b.nos.length) {
      return 1
    } else if (a.nos.length < b.nos.length) {
      return -1
    } else if (a.nos.length === b.nos.length) {
      return a.yes > b.yes ? -1 : 1
    }
    return 0
  })
}

const findRules = function (pairs) {
  let len = pairs.length
  let rules = []
  let already = new Set()
  let exceptions = []
  const doIt = function () {
    let subs = findBest(pairs, already)
    subs.forEach(o => {
      let { nos, done } = getNos(o, pairs)
      o.nos = nos
      o.done = done
    })
    // console.log(subs)
    // subs = subs.filter(o => o.yes > o.no)
    let sub = safest(subs)[0]
    if (!sub) {
      return pairs
    }
    // let score = getScore(sub, pairs)
    rules.push([sub.left, sub.right])
    exceptions = exceptions.concat(sub.nos)
    already.add(sub.left)
    pairs = cull(sub, pairs)
    doIt() //recurse
  }
  // kick it off
  doIt()
  // add remaining to exceptions list
  exceptions = exceptions.concat(pairs)
  // rules = rules.reverse()
  // console.log(`removed ${len - pairs.length} exceptions with ${rules.length} rules`)
  return { rules, exceptions }
}


export default findRules
