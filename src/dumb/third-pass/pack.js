// import keyVal from './key-val.js'
import { pack } from 'efrt'

// longest common prefix
const findOverlap = (from, to) => {
  let all = []
  for (let i = 0; i < from.length; i += 1) {
    if (from[i] === to[i]) {
      all.push(from[i])
    } else {
      break
    }
  }
  return all.join('')
}

// run-length encode any shared prefix
let keyVal = function (key, val) {
  let prefix = findOverlap(key, val)
  if (prefix.length < 1) {
    return val
  }
  let len = String(prefix.length)
  if (prefix.length === key.length) {
    len = ''
  }
  let out = len + val.substr(prefix.length)
  return out
}

const packArr = function (arr = []) {
  let tmp = {}
  arr.forEach(a => {
    let val = keyVal(a[0], a[1])// compress any shared prefix
    tmp[a[0]] = val
  })
  // console.log(tmp)
  return pack(tmp)
}

// const compress = function (model) {
//   let out = {
//     fwd: packObj(model.fwd),
//     both: packObj(model.both),
//     rev: packObj(model.rev),
//     ex: packObj(model.ex),
//   }
//   return out
// }
export default packArr


// let model = {
//   fwd: {
//     foo: 'food',
//     bar: 'bard',
//     cool: 'nice'
//   }
// }
// console.log(compress(model))