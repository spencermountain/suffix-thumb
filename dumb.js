import model from '/Users/spencer/mountain/de-compromise/data/models/adjectives/adjectives.js'
import dumb from './src/dumb/index.js'

let pairs = []
Object.keys(model).forEach(k => {
  pairs.push([k, model[k][0]])
})
let res = dumb(pairs)
