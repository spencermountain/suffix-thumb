import press from './press.js'
import { unIndex } from '../_lib.js'

// remove shared data in key-val pairs
// uses an ad-hoc run-length encoding format 
// {walk: walking}  -> {walk: '.4ing'}
const pressPairs = function (pairs) {
  pairs = pairs.map(a => {
    return press(a[0], a[1]).join('|')
  })
  return pairs.join(',')
}

const compress = function (model = {}) {
  model = Object.assign({}, model)

  // compress fwd rules
  model.rules = unIndex(model.rules)
  model.rules = pressPairs(model.rules)
  // compress reverse rules
  if (model.rev) {
    model.rev = unIndex(model.rev)
    model.rev = pressPairs(model.rev)
  }

  // compress exceptions
  model.exceptions = Object.entries(model.exceptions)
  model.exceptions = pressPairs(model.exceptions)
  return model
}
export default compress