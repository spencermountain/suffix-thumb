import reverse from '../../reverse/index.js'
import convert from '../convert.js'

const thirdPass = function (pairs, model) {
  let rev = reverse(model)
  pairs.forEach(arr => {
    let [a, b] = arr
    // test forward
    if (convert(a, model) !== b) {
      model.ex[a] = b
    }
    // test backward
    if (convert(b, rev) !== a) {
      model.ex[a] = b
    }
  })
  return model
}
export default thirdPass