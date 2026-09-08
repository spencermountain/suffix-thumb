import solve from './solve.js'
import validate from '../validate/index.js'

const defaults = {
  min: 0,
  reverse: true,
  verbose: false,
}

const learn = function (input = [], opts = {}) {
  opts = Object.assign({}, defaults, opts)
  // left side must be unique. The right side may repeat ('poner'/'ponerse' → 'puesto'),
  // but only the first pair is used when learning the reverse direction.
  let pairs = validate(input, { reverse: false })
  if (opts.verbose && pairs.length < input.length) {
    console.warn(`suffix-thumb: skipped ${input.length - pairs.length} pairs (repeated, or unencodable)`) // eslint-disable-line
  }
  let firstFor = {}
  pairs.forEach(a => {
    if (!firstFor.hasOwnProperty(a[1])) {
      firstFor[a[1]] = a[0]
    }
  })
  // pairs that are not the reverse-target of their right side can't live in `ex`,
  // since reverse() flips it. They are stored as whole-word rules in `fwd` instead.
  let strict = new Set(pairs.filter(a => firstFor[a[1]] !== a[0]).map(a => a[0]))

  // forward direction
  let fwd = solve(pairs, opts, undefined, strict)
  let both = {}
  let rev = { rules: {}, ex: {} }
  if (opts.reverse !== false) {
    // backward direction - a rule that is the mirror of a forward rule is free, and shared
    let revPairs = Object.keys(firstFor).map(w2 => [w2, firstFor[w2]])
    let isFree = (key, add) => fwd.rules[add] === key
    rev = solve(revPairs, opts, isFree)
    Object.keys(rev.rules).forEach(key => {
      let add = rev.rules[key]
      if (fwd.rules[add] === key) {
        both[add] = key
        delete fwd.rules[add]
        delete rev.rules[key]
      }
    })
  }
  // exceptions are keyed by the left side, and work in both directions.
  // (a backward exception belongs to the first pair for that right-side word)
  let ex = {}
  pairs.forEach(([w, w2]) => {
    if (fwd.ex.hasOwnProperty(w) || (rev.ex.hasOwnProperty(w2) && firstFor[w2] === w)) {
      ex[w] = w2
    }
  })
  return {
    fwd: fwd.rules,
    both,
    rev: rev.rules,
    ex,
  }
}
export default learn
