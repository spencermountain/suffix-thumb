const thumb = require('./src')
const words = [
  ['walk', 'walking'],
  ['smoke', 'smoking'],
  ['talk', 'talking'],
  ['wait', 'waiting'],
  ['study', 'studying'],
  ['poofoo', 'poobar'],
]
let res = thumb(words)
console.log(res)
