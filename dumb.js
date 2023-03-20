import model from '/Users/spencer/mountain/de-compromise/data/models/adjectives/adjectives.js'
import dumb from './src/dumb/index.js'
import fs from 'fs'

let together = {}

for (let i = 0; i < 4; i += 1) {
  console.log(`=====${i}=====`)
  let pairs = []
  Object.keys(model).forEach(k => {
    pairs.push([k, model[k][i]])
  })
  let res = dumb(pairs)
  res.rules.forEach(a => {
    let [from, to] = a
    together[from] = together[from] || []
    together[from][i] = to
  })
}

fs.writeFileSync('./together.js', 'export default ' + JSON.stringify(together, null, 2))
// console.log(JSON.stringify(res, null, 2))