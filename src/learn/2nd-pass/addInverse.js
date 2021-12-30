import { convert, reverse } from '../../index.js'
import { indexRules } from '../../_lib.js'

// add all reverse-exceptions
const addInverse = function (model, pairs) {
  // create a reverse model
  let tmp = Object.assign({}, model)
  tmp.rules = indexRules(model.rules)
  let rev = reverse(tmp)
  // look for exceptions
  pairs.forEach(a => {
    let [left, right] = a
    if (convert(right, rev) !== left) {
      // console.log(a)
      model.exceptions[a[0]] = a[1]
    }
  })
  // console.log(convert('relearn', rev))
  return model
}
export default addInverse