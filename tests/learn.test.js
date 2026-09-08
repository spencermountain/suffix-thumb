import test from 'tape'
import { learn, convert, reverse, compress, uncompress } from './lib/_lib.js'
import perfecto from './data/perfecto.js'
import pastParticiple from './data/past-participle.js'
import itGerund from './data/it-gerund.js'
import esPlurals from './data/es-plurals.js'

// the reverse of a repeated right-side word is the first pair that produced it
const firstPairs = function (pairs) {
  let first = {}
  pairs.forEach(a => {
    if (!first.hasOwnProperty(a[1])) {
      first[a[1]] = a[0]
    }
  })
  return Object.keys(first).map(k => [k, first[k]])
}

test('right-side duplicates', function (t) {
  let pairs = [
    ['poner', 'puesto'],
    ['ponerse', 'puesto'],
    ['componer', 'compuesto'],
    ['walk', 'walked'],
    ['talk', 'talked'],
  ]
  let model = learn(pairs)
  pairs.forEach(a => t.equal(convert(a[0], model), a[1], `[fwd] ${a[0]}`))
  let rev = reverse(model)
  t.equal(convert('puesto', rev), 'poner', '[rev] first pair wins')
  t.equal(convert('compuesto', rev), 'componer', '[rev] compuesto')
  t.equal(convert('walked', rev), 'walk', '[rev] walked')
  t.end()
})

const datasets = { perfecto, pastParticiple, itGerund, esPlurals }
Object.keys(datasets).forEach(name => {
  test(`both directions: ${name}`, function (t) {
    let pairs = datasets[name]
    let model = uncompress(compress(learn(pairs)))
    let rev = reverse(model)
    let fwdBad = pairs.filter(a => convert(a[0], model) !== a[1])
    let revBad = firstPairs(pairs).filter(a => convert(a[0], rev) !== a[1])
    t.deepEqual(fwdBad, [], `[${name}] forward`)
    t.deepEqual(revBad, [], `[${name}] backward`)
    t.end()
  })
})

test('rule may match the whole word', function (t) {
  let pairs = [
    ['jeter', 'jetterons'],
    ['rejeter', 'rejetterons'],
    ['projeter', 'projetterons'],
    ['parler', 'parlerons'],
    ['manger', 'mangerons'],
    ['donner', 'donnerons'],
  ]
  let model = learn(pairs)
  t.equal(Object.keys(model.ex).length, 0, 'no exceptions needed')
  t.equal(convert('jeter', model), 'jetterons', 'jeter')
  t.equal(convert('jeter', reverse(learn(pairs.map(a => [a[1], a[0]])))), 'jetterons', 'jeter (learned backwards)')
  t.end()
})

test('exception when prefix differs', function (t) {
  let model = learn([
    ['go', 'went'],
    ['walk', 'walked'],
    ['talk', 'talked'],
  ])
  t.equal(model.ex.go, 'went', 'go is an exception')
  t.equal(convert('go', model), 'went', 'go')
  t.equal(convert('went', reverse(model)), 'go', 'went')
  t.end()
})

test('min option', function (t) {
  let pairs = [
    ['walk', 'walked'],
    ['talk', 'talked'],
    ['bake', 'baked'],
    ['sit', 'sat'],
  ]
  let model = learn(pairs, { min: 2 })
  // 'sit' can only be an exception, not a one-off rule
  t.equal(model.ex.sit, 'sat', 'sit is an exception')
  pairs.forEach(a => t.equal(convert(a[0], model), a[1], `[min] ${a[0]}`))
  t.end()
})

test('one-way model', function (t) {
  let pairs = [
    ['walk', 'walked'],
    ['talk', 'talked'],
    ['go', 'went'],
  ]
  let model = learn(pairs, { reverse: false })
  t.deepEqual(model.both, {}, 'no shared rules')
  t.deepEqual(model.rev, {}, 'no reverse rules')
  pairs.forEach(a => t.equal(convert(a[0], model), a[1], `[one-way] ${a[0]}`))
  t.end()
})

test('empty and junk input', function (t) {
  t.deepEqual(learn([]), { fwd: {}, both: {}, rev: {}, ex: {} }, 'empty')
  let model = learn([['walk', 'walked'], null, ['x'], [1, 2], ['talk', 'talked']])
  t.equal(convert('walk', model), 'walked', 'junk ignored')
  t.equal(convert('nope', {}), 'nope', 'empty model passes through')
  t.equal(convert('', {}), '', 'empty string, empty model')
  t.end()
})
