import test from 'tape'
import { learn, convert, reverse } from './lib/_lib.js'


test('use of same', function (t) {
  const pairs = [
    ['acool', 'agood'],
    ['bcool', 'bgood'],
    ['ccool', 'cgood'],
    ['dcool', 'dgood'],
    ['ecool', 'egood'],
    ['gcool', 'ggood'],
    ['ooocool', 'ooocool'],//unchanged
  ]
  const model = learn(pairs)
  const rev = reverse(model)
  // test them all
  pairs.forEach((a) => {
    const created = convert(a[0], model)
    t.equal(created, a[1], `[same] '${a[0]}' -> '${created}'`)

    const back = convert(a[1], rev)
    t.equal(back, a[0], `[same back] '${a[0]}' -> '${created}'`)
  })
  t.end()
})

test('suffix not whole word', function (t) {
  const pairs = [
    ['croirai', 'croire'],
    ['cuirai', 'cuire'],
    ['croulerai', 'crouler'],
    ['cuisinerai', 'cuisiner'],
    ['déblayerai', 'déblayer'],
    ['débouillirai', 'débouillir'],
  ]
  const model = learn(pairs)
  const rev = reverse(model)
  // test them all
  pairs.forEach((a) => {
    const created = convert(a[0], model)
    t.equal(created, a[1], `[whole-word] '${a[0]}' -> '${created}'`)

    const back = convert(a[1], rev)
    t.equal(back, a[0], `[whole-word back] '${a[0]}' -> '${created}'`)
  })
  t.end()
})

test('misc', function (t) {
  const pairs = [
    ['bouffer', 'boufferai'],
    ['bouffir', 'bouffirai'],
    ['confiner', 'confinerai'],
    ['confire', 'confirai'],
    ['autosuffire', 'autosuffirai'],
    ['autotracter', 'autotracterai'],
    ['autostimuler', 'autostimulerai'],
    ['autosuffire', 'autosuffirai'],
  ]
  const model = learn(pairs)
  const rev = reverse(model)
  // test them all
  pairs.forEach((a) => {
    const created = convert(a[0], model)
    t.equal(created, a[1], `[misc] '${a[0]}' -> '${created}'`)

    const back = convert(a[1], rev)
    t.equal(back, a[0], `[misc back] '${a[0]}' -> '${created}'`)
  })
  t.end()
})

test('rev', function (t) {
  const pairs = [
    ['autoconstruire', 'autoconstruirons'],
    ['réjouir', 'réjouirons'],
    ['reluire', 'reluirons'],
    ['éconduire', 'éconduirons'],
    ['retraduire', 'retraduirons'],
    ['séduire', 'séduirons'],
    ['surproduire', 'surproduirons'],
    ['traduire', 'traduirons'],
  ]
  const model = learn(pairs)
  const rev = reverse(model)
  // test them all
  pairs.forEach((a) => {
    const created = convert(a[0], model)
    t.equal(created, a[1], `[rev] '${a[0]}' -> '${created}'`)

    const back = convert(a[1], rev)
    t.equal(back, a[0], `[rev back] '${a[0]}' -> '${created}'`)
  })
  t.end()
})

test('fwd', function (t) {
  const pairs = [
    ['devoir', 'devrons'],
    ['émouvoir', 'émouvrons'],
    ['entrevoir', 'entreverrons'],
    ['mouvoir', 'mouvrons'],
    ['pourvoir', 'pourvoirons'],
    ['pouvoir', 'pourrons'],
    ['préconcevoir', 'préconcevrons'],
    ['prévoir', 'prévoirons'],
    ['redevoir', 'redevrons'],
    ['revoir', 'reverrons'],
  ]
  const model = learn(pairs)
  const rev = reverse(model)
  // test them all
  pairs.forEach((a) => {
    const created = convert(a[0], model)
    t.equal(created, a[1], `[fwd] '${a[0]}' -> '${created}'`)

    const back = convert(a[1], rev)
    t.equal(back, a[0], `[fwd back] '${a[0]}' -> '${created}'`)
  })
  t.end()
})