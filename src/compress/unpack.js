import { unpack } from 'efrt'

const uncompress = function (model = {}) {
  if (typeof model === 'string') {
    model = JSON.parse(model)
  }
  model.fwd = unpack(model.fwd)
  model.both = unpack(model.both)
  model.bkwd = unpack(model.bkwd)
  model.ex = unpack(model.ex)
  return model
}
export default uncompress