const thumb = require('./src')
const pairs = [
  ['walk', 'walking'],
  ['smoke', 'smoking'],
  ['create', 'creating'],
  ['bake', 'baking'],
  ['talk', 'talking'],
  ['allow', 'allowing'],
]
thumb(pairs)
/* {
    rules: [ ['lk', 'lking'], ['e', 'ing'] ],
    exceptions: {},
    coverage: 0.83,
    remaining: [ ['allow', 'allowing'] ] 
  }
*/
