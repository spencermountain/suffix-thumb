import filesize from '../tests/lib/filesize.js'
import { compress } from '../src/index.js'

const green = str => '\x1b[32m' + str + '\x1b[0m'
const red = str => '\x1b[31m' + str + '\x1b[0m'
const blue = str => '\x1b[34m' + str + '\x1b[0m'
const magenta = str => '\x1b[35m' + str + '\x1b[0m'
const cyan = str => '\x1b[36m' + str + '\x1b[0m'
const yellow = str => '\x1b[33m' + str + '\x1b[0m'
const black = str => '\x1b[30m' + str + '\x1b[0m'
const dim = str => '\x1b[2m' + str + '\x1b[0m'

const summarize = function (model = {}) {
  model.fwd = model.fwd || {}
  model.rev = model.rev || {}
  model.both = model.both || {}
  model.ex = model.ex || {}
  console.log(green(Object.keys(model.fwd).length), 'fwd', magenta(Object.keys(model.both).length), 'both', magenta(Object.keys(model.rev).length), 'rev')
  console.log('  ', cyan(Object.keys(model.ex).length), 'ex')
  let pkd = compress(model)
  console.log(blue(filesize(pkd) + 'kb total'))
  console.log('\n\n')
}
export default summarize