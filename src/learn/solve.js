import cost from './_cost.js'

// length of the shared prefix of two strings
const commonPrefix = function (a, b) {
  let i = 0
  while (i < a.length && i < b.length && a[i] === b[i]) {
    i += 1
  }
  return i
}

// the replacement this word would need from a rule whose key is its last `k` chars,
// or null if the change reaches further back than that
const needs = function (p, k) {
  if (k < p.w.length - p.c || k > p.w.length) {
    return null
  }
  return p.w2.slice(p.w.length - k)
}

// does this rule produce the right answer for this word?
const works = function (p, rule) {
  return p.w.slice(0, p.w.length - rule.k) + rule.add === p.w2
}

// Find the byte-cheapest set of suffix rules (plus exceptions) that maps every
// left-side word to its right-side word, given the longest-suffix-wins lookup in ./convert.
//
// The words are arranged in a suffix-trie. Walking it bottom-up, each node either
// inherits the rule of its nearest ancestor, or places its own rule which then governs
// every word beneath it (until a deeper node overrides it). Because a rule keyed at
// node `s` can only be one of the transformations the words under `s` actually need,
// each node has just a handful of options, and the optimal choice is found exactly.
//
//   pairs   - [[from, to], ...]  (left side unique)
//   opts.min - a rule must serve at least this many pairs
//   isFree  - (key, add) → true when this rule costs nothing (it is shared with the other direction)
//   strict  - set of left-side words that may not become exceptions
const solve = function (pairs, opts = {}, isFree = () => false, strict = new Set()) {
  let min = opts.min || 0
  let words = pairs.map(([w, w2]) => ({ w, w2, c: commonPrefix(w, w2), strict: strict.has(w) }))
  let memo = new Map()
  let rules = {}
  let ex = {}

  // returns { cost, apply } for the sub-trie at suffix `suff`, given the rule it inherits
  const node = function (suff, list, inherited) {
    // an inherited rule that helps nothing down here is the same as no rule at all
    if (inherited && !list.some(p => needs(p, inherited.k) === inherited.add)) {
      inherited = null
    }
    let key = suff + '|' + (inherited ? inherited.k + ':' + inherited.add : '')
    if (memo.has(key)) {
      return memo.get(key)
    }
    // rules that could be keyed at this suffix, and how many words each would serve
    let candidates = new Map()
    // the word that *is* this suffix, and the sub-tries by preceding character
    let whole = null
    let kids = new Map()
    list.forEach(p => {
      let add = needs(p, suff.length)
      if (add !== null) {
        candidates.set(add, (candidates.get(add) || 0) + 1)
      }
      if (p.w.length === suff.length) {
        whole = p
      } else {
        let char = p.w[p.w.length - suff.length - 1]
        if (!kids.has(char)) {
          kids.set(char, [])
        }
        kids.get(char).push(p)
      }
    })

    // total cost of governing this sub-trie with `rule`
    const option = function (rule, placed) {
      let total = placed && !isFree(suff, rule.add) ? cost(suff, rule.add) : 0
      let exceptions = 0
      let parts = []
      let wholeEx = false
      if (whole && !(rule && works(whole, rule))) {
        if (whole.strict) {
          return { cost: Infinity }
        }
        wholeEx = true
        total += cost(whole.w, whole.w2)
        exceptions += 1
      }
      for (let [char, sub] of kids) {
        let res = node(char + suff, sub, rule)
        total += res.cost
        exceptions += res.exceptions
        parts.push(res)
      }
      return { cost: total, exceptions, rule, placed, wholeEx, parts }
    }

    let best = option(inherited, false)
    for (let [add, count] of candidates) {
      // a whole-word rule is just an exception in disguise; it is always allowed
      let isWhole = whole !== null && add === whole.w2
      if (count < min && !isWhole) {
        continue
      }
      let o = option({ k: suff.length, add }, true)
      // on a tie in bytes, prefer fewer exceptions - a rule packs better, and generalizes
      // (unless the rule only got in under the whole-word exemption)
      let tie = o.cost === best.cost && o.exceptions < best.exceptions && count >= min
      if (o.cost < best.cost || tie) {
        best = o
      }
    }
    let out = {
      cost: best.cost,
      exceptions: best.exceptions,
      apply: function () {
        if (best.placed) {
          rules[suff] = best.rule.add
        }
        if (best.wholeEx) {
          ex[whole.w] = whole.w2
        }
        best.parts.forEach(part => part.apply())
      },
    }
    memo.set(key, out)
    return out
  }

  if (words.length > 0) {
    node('', words, null).apply()
  }
  return { rules, ex }
}
export default solve
