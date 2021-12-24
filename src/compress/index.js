import { pack } from 'efrt'
// import toRules from '../learn/toRules.js'

const compress = function (model = {}) {
  // model = toRules(model)
  // model.exceptions = pack(model.exceptions)
  return model
}
export default compress