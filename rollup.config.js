import { terser } from 'rollup-plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
import pkg from './package.json' assert { type: "json" };

const name = 'suffix-thumb'
const banner = `/* ${name} ${pkg.version} MIT */`

export default [
  {
    input: 'src/index.js',
    output: [{ file: `builds/${name}.mjs`, format: 'esm', banner: banner },
    ],
    plugins: [sizeCheck()],
  },
  {
    input: 'src/index.js',
    output: [{ file: `builds/${name}.js`, format: 'umd', name: 'suffixThumb', banner: banner }],
    plugins: [sizeCheck(),],
  },
  {
    input: 'src/index.js',
    output: [{ file: `builds/${name}.min.js`, format: 'umd', name: 'suffixThumb', banner: banner }],
    plugins: [terser(), sizeCheck(),],
  }
]
