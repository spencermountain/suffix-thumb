/* eslint-disable no-console */
import * as src from '../../src/index.js'
import * as build from '../../builds/suffix-thumb.mjs'

let nlp = src
if (process.env.TESTENV === 'prod') {
  console.warn('== production build test 🚀 ==')
  nlp = build
}
export default nlp
export const { learn, convert, reverse, compress, uncompress, validate, test } = nlp
