import { unpack } from 'efrt'



const uncompress = function (model = {}) {
  if (typeof model.exceptions === 'string') {
    model.exceptions = unpack(model.exceptions)
  }
  return model
}
export default uncompress