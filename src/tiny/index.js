import test from './test.js'
import firstPass from './01-firstPass.js'
import jsonDiff from 'json-diff'
const yellow = str => '\x1b[33m' + str + '\x1b[0m'
const dim = str => '\x1b[2m' + str + '\x1b[0m'



const mergeRules = function (a, b) {
  let out = Object.assign({}, a)
  out.fallback = a.fallback || b.fallback
  let len = a.rules.length > b.rules.length ? a.rules.length : b.rules.length
  for (let i = 0; i < len; i += 1) {
    out.rules[i] = Object.assign(b.rules[i] || {}, out.rules[i] || {})
  }
  return out
}

const tiny = function (pairs) {
  let found = { rules: [{}, {}, {}, {}, {}, {}, {}] }
  let left = pairs.slice(0)
  for (let i = 0; i < 4; i += 1) {
    console.log(yellow(`\n-- #${i} --   `) + dim(`(${left.length} remain)`))
    let old = JSON.parse(JSON.stringify(found))
    let m = firstPass(left, i)
    found = mergeRules(found, m)
    // log debugger
    // found.rules.forEach((_k, n) => {
    //   let tmp = jsonDiff.diffString(old.rules[n], found.rules[n])
    //   if (tmp) {
    //     console.log(tmp);
    //   }
    // })
    left = test(pairs, found)
    // console.log(left)
  }
  // console.log(found)
  return found
}
export default tiny