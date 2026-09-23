import test from 'tape'
import { createRequire } from 'node:module'
import * as esm from 'suffix-thumb'

const require = createRequire(import.meta.url)

test('package entry points', function (t) {
  const cjs = require('suffix-thumb')
  const exports = ['compress', 'convert', 'learn', 'reverse', 'test', 'uncompress', 'validate']
  for (const [format, api] of [['ESM', esm], ['CommonJS', cjs]]) {
    t.deepEqual(Object.keys(api).sort(), exports, `${format} exposes the public API`)
    const model = api.learn([['cat', 'cats'], ['dog', 'dogs']])
    t.equal(api.convert('cat', model), 'cats', `${format} learns and converts`)
    t.equal(api.convert('cats', api.reverse(model)), 'cat', `${format} reverses`)
  }
  t.end()
})
