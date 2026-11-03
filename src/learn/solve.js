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

// an inherited rule that helps nothing down here is the same as no rule at all
const normalize = function (list, inherited) {
  if (inherited && !list.some(p => needs(p, inherited.k) === inherited.add)) {
    return null
  }
  return inherited
}

// the word that *is* this suffix, and the sub-tries by preceding character
const partition = function (suff, list) {
  let whole = null
  const kids = new Map()
  list.forEach(p => {
    if (p.w.length === suff.length) {
      whole = p
    } else {
      const char = p.w[p.w.length - suff.length - 1]
      if (!kids.has(char)) {
        kids.set(char, [])
      }
      kids.get(char).push(p)
    }
  })
  return { whole, kids }
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
// Two passes: the costing pass memoizes one small record per (suffix, inherited rule)
// pair, then a walk down the winning options emits the rules. Keeping whole option
// trees in the memo instead holds gigabytes on large word-lists.
//
//   pairs   - [[from, to], ...]  (left side unique)
//   opts.min - a rule must serve at least this many pairs
//   isFree  - (key, add) → true when this rule costs nothing (it is shared with the other direction)
//   strict  - set of left-side words that may not become exceptions
const solve = function (pairs, opts = {}, isFree = () => false, strict = new Set()) {
  const min = opts.min || 0
  const words = pairs.map(([w, w2]) => ({ w, w2, c: commonPrefix(w, w2), strict: strict.has(w) }))
  const memo = new Map()
  const rules = Object.create(null)
  const ex = Object.create(null)

  // the cheapest arrangement for the sub-trie at suffix `suff`, given the rule it inherits
  const node = function (suff, list, inherited) {
    inherited = normalize(list, inherited)
    const key = suff + '|' + (inherited ? inherited.k + ':' + inherited.add : '')
    if (memo.has(key)) {
      return memo.get(key)
    }
    // rules that could be keyed at this suffix, and how many words each would serve
    const candidates = new Map()
    list.forEach(p => {
      const add = needs(p, suff.length)
      if (add !== null) {
        candidates.set(add, (candidates.get(add) || 0) + 1)
      }
    })
    const { whole, kids } = partition(suff, list)

    // total cost of governing this sub-trie with `rule`
    const option = function (rule, placed) {
      let total = placed && !isFree(suff, rule.add) ? cost(suff, rule.add) : 0
      let exceptions = 0
      let wholeEx = false
      if (whole && !(rule && works(whole, rule))) {
        if (whole.strict) {
          return { cost: Infinity }
        }
        wholeEx = true
        total += cost(whole.w, whole.w2)
        exceptions += 1
      }
      for (const [char, sub] of kids) {
        const res = node(char + suff, sub, rule)
        total += res.cost
        exceptions += res.exceptions
      }
      return { cost: total, exceptions, rule, placed, wholeEx }
    }

    let best = option(inherited, false)
    for (const [add, count] of candidates) {
      // a whole-word rule is just an exception in disguise; it is always allowed
      const isWhole = whole !== null && add === whole.w2
      if (count < min && !isWhole) {
        continue
      }
      const o = option({ k: suff.length, add }, true)
      // on a tie in bytes, prefer fewer exceptions - a rule packs better, and generalizes
      // (unless the rule only got in under the whole-word exemption)
      const tie = o.cost === best.cost && o.exceptions < best.exceptions && count >= min
      if (o.cost < best.cost || tie) {
        best = o
      }
    }
    const out = {
      cost: best.cost,
      exceptions: best.exceptions,
      placed: best.placed === true,
      add: best.placed ? best.rule.add : null,
      wholeEx: best.wholeEx === true,
    }
    memo.set(key, out)
    return out
  }

  // re-trace the winning options, writing out their rules and exceptions
  const walk = function (suff, list, inherited) {
    inherited = normalize(list, inherited)
    const entry = memo.get(suff + '|' + (inherited ? inherited.k + ':' + inherited.add : ''))
    const { whole, kids } = partition(suff, list)
    if (entry.placed) {
      rules[suff] = entry.add
    }
    if (entry.wholeEx) {
      ex[whole.w] = whole.w2
    }
    const rule = entry.placed ? { k: suff.length, add: entry.add } : inherited
    for (const [char, sub] of kids) {
      walk(char + suff, sub, rule)
    }
  }

  if (words.length > 0) {
    node('', words, null)
    walk('', words, null)
  }
  return { rules, ex }
}
export default solve
