const thumb = require('./src')
// const pairs = []
const pairs = require('./tmp')

let res = thumb(pairs)
console.log(res)
/* {
    rules: [ ['lk', 'lking'], ['e', 'ing'] ],
    exceptions: {},
    coverage: 0.83,
    remaining: [ ['allow', 'allowing'] ] 
  }
*/
