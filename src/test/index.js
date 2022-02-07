import learn from '../learn/index.js'
import compress from '../compress/index.js'
import reverse from '../reverse/index.js'
import convert from '../convert/index.js'
import filesize from './filesize.js'

const green = str => '\x1b[32m' + str + '\x1b[0m'
const red = str => '\x1b[31m' + str + '\x1b[0m'
const blue = str => '\x1b[34m' + str + '\x1b[0m'
const magenta = str => '\x1b[35m' + str + '\x1b[0m'
const cyan = str => '\x1b[36m' + str + '\x1b[0m'
const yellow = str => '\x1b[33m' + str + '\x1b[0m'
const black = str => '\x1b[30m' + str + '\x1b[0m'
const dim = str => '\x1b[2m' + str + '\x1b[0m'


const testFwd = function (pairs, model) {
  let wrong = 0
  pairs.forEach((a) => {
    let created = convert(a[0], model)
    if (created !== a[1]) {
      wrong += 1
      console.log(red('error:', a, created))
    }
  })
  if (wrong === 0) {
    console.log(green(`  ✓ forward`))
  } else {
    console.log(red(` ✗ ${wrong} `) + 'errors')
  }
  return wrong
}

const testBack = function (pairs, model) {
  let wrong = 0
  let rev = reverse(model)
  pairs.forEach((a) => {
    let created = convert(a[1], rev)
    if (created !== a[0]) {
      wrong += 1
      console.log(red('error:', a, created))
    }
  })
  if (wrong === 0) {
    console.log(green(`  ✓ backward`))
  } else {
    console.log(red(` ✗ ${wrong} `) + 'errors')
  }
  return wrong
}

const testSize = function (pairs, model) {
  let before = filesize(pairs)
  let smol = compress(model)
  let after = filesize(smol)
  console.log(`  ${before} -> ${after}`)
}


const stats = function (model) {
  let rules = 0
  Object.keys(model.rules).forEach(k => rules += model.rules[k].length)
  let exc = Object.keys(model.exceptions).length
  console.log(`${blue(rules.toLocaleString())} rules, ${blue(exc.toLocaleString())} exceptions`)
}

const test = function (pairs, opts) {
  let model = learn(pairs, opts)
  stats(model)
  // 
  testSize(pairs, model)
  // 
  testFwd(pairs, model)
  testBack(pairs, model)
}
export default test