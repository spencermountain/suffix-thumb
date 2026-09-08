import test from 'tape'
import { learn, convert, compress, uncompress, reverse, validate } from './lib/_lib.js'
import frWords from './data/fr-words.js'
import gerund from './data/gerund.js'
import presentTense from './data/present-tense.js'


test('frWords:', function (t) {
  let model = learn(frWords)
  model = uncompress(compress(model))
  // test forward
  frWords.forEach((a) => t.equal(convert(a[0], model), a[1], `[frWords] '${a[0]}'`))
  // test backward
  model = reverse(model)
  frWords.forEach((a) => t.equal(convert(a[1], model), a[0], `[bkwd frWords] '${a[0]}'`))
  t.end()
})

test('gerund:', function (t) {
  let model = learn(gerund)
  model = uncompress(compress(model))
  // test forward
  gerund.forEach((a) => t.equal(convert(a[0], model), a[1], `[gerund] '${a[0]}'`))
  // test backward
  model = reverse(model)
  gerund.forEach((a) => t.equal(convert(a[1], model), a[0], `[bkwd gerund] '${a[0]}'`))
  t.end()
})


test('presentTense:', function (t) {
  let model = learn(presentTense)
  model = uncompress(compress(model))
  // test forward
  presentTense.forEach((a) => t.equal(convert(a[0], model), a[1], `[presentTense] '${a[0]}'`))
  // test backward
  model = reverse(model)
  presentTense.forEach((a) => t.equal(convert(a[1], model), a[0], `[bkwd presentTense] '${a[0]}'`))
  t.end()
})



test('empty sections:', function (t) {
  let pairs = [
    ['walk', 'walked'],
    ['talk', 'talked'],
    ['go', 'went'],
  ]
  let model = uncompress(compress(learn(pairs)))
  t.deepEqual(model.fwd, {}, 'empty fwd stays empty')
  t.equal(convert('walk', model), 'walked', 'fallback rule still applies')
  t.equal(convert('walked', reverse(model)), 'walk', 'reverse fallback')
  t.end()
})

test('packed format:', function (t) {
  let model = {
    fwd: { ltador: 'ltadoras', nzador: 'nzadoras', epador: 'epadoras', ero: 'eras', ntonero: 'ntoneras' },
    both: { '': 'ed', er: 'é' },
    rev: {},
    ex: { go: 'went' },
  }
  let str = compress(model)
  t.equal(typeof str, 'string', 'is a string')
  t.equal(str, '0as:ador{lt,nz,ep}|1as:ero{,nton}~0ed:|2é:er~~2went:go', 'expected layout')
  t.deepEqual(uncompress(str), model, 'round-trips')
  t.end()
})

test('packed format: nesting', function (t) {
  let fwd = {}
  ;['abcdxyz', 'bbcdxyz', 'cdxyz', 'pqxyz', 'rqxyz', 'xyz', 'z'].forEach(k => (fwd[k] = k + 's'))
  let model = { fwd, both: {}, rev: {}, ex: {} }
  let str = compress(model)
  t.ok(str.startsWith('0s:'), 'one group')
  t.deepEqual(uncompress(str).fwd, fwd, 'round-trips nested braces')
  t.end()
})

test('packed format: every dataset round-trips', function (t) {
  ;[frWords, gerund, presentTense].forEach(pairs => {
    let model = learn(pairs)
    let back = uncompress(compress(model))
    t.deepEqual(back, model, 'round-trip')
  })
  t.end()
})

test('old models are refused', function (t) {
  t.throws(() => uncompress({ fwd: '', both: 'ed:', rev: '', ex: 'went:go' }), /v6/, 'object')
  t.throws(() => uncompress('{"fwd":""}'), /v6/, 'json string')
  t.end()
})
