import test from 'tape'
import { learn, classify } from '../src/index.js'

test('classify', function (t) {
  let arr = [
    ["appeared", "appear"],
    ["heard", "hear"],
    ["bore", "bear"],
    ["wore", "wear"],
    ["feared", "fear"],
    ["cleared", "clear"],
    ["disappeared", "disappear"],
    ["endeared", "endear"],
    ["swore", "swear"],
    ["tore", "tear"],
    ["forbore", "forbear"],
    ["neared", "near"],
  ]
  let model = learn(arr)
  arr.forEach(a => {
    t.equal(classify(a[0], model), 'Left', 'classify ' + a[0])
    t.equal(classify(a[1], model), 'Right', 'classify ' + a[0])
  })
  t.end()
})