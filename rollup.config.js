import { terser } from 'rollup-plugin-terser'
import sizeCheck from 'rollup-plugin-filesize-check'
const name = 'suffix-thumb'

import { version } from './package.json'
const banner = `/* ${name} ${version} MIT */`

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: `builds/${name}.mjs`,
        format: 'esm',
        banner: banner,
      },
    ],
    plugins: [sizeCheck()],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: `builds/${name}.cjs`,
        format: 'umd',
        name: 'suffixThumb',
        banner: banner,
      },
    ],
    plugins: [
      sizeCheck(),
    ],
  },
  {
    input: 'src/_client-side.js',
    output: [
      {
        file: `builds/${name}-client.js`,
        format: 'esm',
      },
    ],
    plugins: [
      terser(),
      sizeCheck(),
    ],
  },
]
