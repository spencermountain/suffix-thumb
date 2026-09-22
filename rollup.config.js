/* eslint-disable no-console */
import fs from 'node:fs'
import terser from '@rollup/plugin-terser'

const pkg = JSON.parse(fs.readFileSync('./package.json').toString())
const version = pkg.version
console.log('\n 📦  - running rollup..\n')

const name = 'suffix-thumb'
const banner = '/* spencermountain/suffix-thumb ' + version + ' Apache 2.0 */'

export default [
  {
    input: 'src/index.js',
    output: [
      { file: `builds/${name}.mjs`, format: 'esm', banner: banner },
      { file: `builds/${name}.cjs`, format: 'cjs', banner: banner },
    ],
    plugins: [{
      name: 'commonjs-types',
      generateBundle(output) {
        if (output.format === 'cjs') {
          this.emitFile({
            type: 'asset',
            fileName: 'types.d.cts',
            source: fs.readFileSync('./builds/types.d.ts', 'utf8'),
          })
        }
      },
    }],
  },
  {
    input: 'src/index.js',
    output: [{ file: `builds/${name}.js`, format: 'umd', name: 'suffixThumb', banner: banner }],
    plugins: [],
  },
  {
    input: 'src/index.js',
    output: [{ file: `builds/${name}.min.js`, format: 'umd', name: 'suffixThumb', banner: banner }],
    plugins: [terser()],
  }
]
