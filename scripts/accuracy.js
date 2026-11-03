/* eslint-disable no-console */
import { data, holdout } from '../tests/lib/holdout.js'

// how well do models do on words they have not seen?
//   node scripts/accuracy.js [rounds]
const rounds = Number(process.argv[2] || 1)

const green = str => '\x1b[32m' + str + '\x1b[0m'
const red = str => '\x1b[31m' + str + '\x1b[0m'
const show = (have, want) => (have >= want ? green(have + '%') : red(have + '%'))
data.forEach(o => {
  const { pairs, name, fwd, rev } = o
  const res = holdout(pairs, { rounds })
  const ok = res.fwd >= fwd && res.rev >= rev ? '✅' : '❌'
  console.log(`${ok} ${name.padEnd(16)} ${show(res.fwd, fwd)}  -  🔄 ${show(res.rev, rev)}    want ${fwd}% - ${rev}%`)
})
