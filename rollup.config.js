import fs from 'fs'
import terser from '@rollup/plugin-terser'

const pkg = JSON.parse(fs.readFileSync('./package.json').toString())
const version = pkg.version
console.log('\n 📦  - running rollup..\n')

const name = 'suffix-thumb'
const banner = '/* spencermountain/suffix-thumb ' + version + ' Apache 2.0 */'

export default [
  {
    input: 'src/index.js',
    output: [{ file: `builds/${name}.mjs`, format: 'esm', banner: banner },
    ],
    plugins: [],
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
