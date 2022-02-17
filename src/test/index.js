import { learn, convert, compress, uncompress, reverse } from '../index.js'
import filesize from './filesize.js'
import testSide from './classify.js'

const green = str => '\x1b[32m' + str + '\x1b[0m'
const red = str => '\x1b[31m' + str + '\x1b[0m'
const blue = str => '\x1b[34m' + str + '\x1b[0m'
const yellow = str => '\x1b[33m' + str + '\x1b[0m'
const dim = str => '\x1b[2m' + str + '\x1b[0m'

const testFwd = function (pairs, model) {
  let wrong = 0
  pairs.forEach((a) => {
    let created = convert(a[0], model)
    if (created !== a[1]) {
      wrong += 1
      console.log(red('error:'), yellow(a[0] + ' →' + created))
    }
  })
  if (wrong === 0) {
    console.log(green(`  ✓ forward`))
  } else {
    console.log(red(` ✗ ${wrong} `) + 'errors\n')
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
      console.log(red('  rev ✗: '), yellow(a[1] + ' → ' + created))
    }
  })
  if (wrong === 0) {
    console.log(green(`  ✓ backward`))
  } else {
    console.log(red(`  ✗ ${wrong} `) + 'errors reversed\n')
  }
  return wrong
}

const testSize = function (pairs, model) {
  let before = filesize(pairs)
  let smol = compress(model)
  let after = filesize(smol)
  console.log(`  ${dim(before)} -> ${blue(after)}`)
}

const stats = function (model) {
  let rules = 0
  Object.keys(model.rules).forEach(k => rules += model.rules[k].length)
  let rev = 0
  Object.keys(model.rev || {}).forEach(k => rev += model.rev[k].length)
  let exc = Object.keys(model.exceptions).length
  console.log(`  ${blue(rules.toLocaleString())} rules,  ${yellow(rev.toLocaleString())} reversed,  ${blue(exc.toLocaleString())} exceptions`)
}

const test = function (pairs, opts) {
  console.log('\n')
  console.log(yellow(pairs.length.toLocaleString()) + ` pairs -  ${dim(filesize(pairs))}`)
  let begin = new Date()
  let model = learn(pairs, opts)
  let end = new Date()
  console.log('   ', (end.getTime() - begin.getTime()) / 1000, 'seconds')

  console.log(yellow('\nSize:'))
  stats(model)
  testSize(pairs, model)

  model = compress(model)
  model = uncompress(model)

  console.log(yellow('\nForward:'))
  testFwd(pairs, model)
  console.log(yellow('\nBackward:'))
  testBack(pairs, model)
  // hmm
  // console.log(yellow('\nClassify:'))
  // testSide(pairs, model, 'Left')
  // testSide(pairs, model, 'Right')

}
export default test