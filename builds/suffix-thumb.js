/* spencermountain/suffix-thumb 6.0.0 Apache 2.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.suffixThumb = {}));
})(this, (function (exports) { 'use strict';

  // the four parts of a model, in the order they are packed
  const sections = ['fwd', 'both', 'rev', 'ex'];

  // characters with a meaning in the packed format - words containing these cannot be learned
  const reserved = /[~|:,{}0-9]/;

  // a value is stored relative to its key:
  //   'chico' → 'chicas'  is  '1as'  (drop one char, add 'as')
  //   'er' → 'é'          is  '2é'
  const encodeVal = function (key, val) {
    let i = 0;
    while (i < key.length && i < val.length && key[i] === val[i]) {
      i += 1;
    }
    return String(key.length - i) + val.slice(i)
  };

  const decodeVal = function (key, str) {
    let m = str.match(/^[0-9]+/);
    let n = m ? Number(m[0]) : 0;
    let tail = m ? str.slice(m[0].length) : str;
    return key.slice(0, key.length - n) + tail
  };

  // estimated byte-cost of one `key → val` entry, once packed
  const cost = function (key, val) {
    return key.length + encodeVal(key, val).length + 2 // separators
  };

  // length of the shared prefix of two strings
  const commonPrefix = function (a, b) {
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) {
      i += 1;
    }
    return i
  };

  // the replacement this word would need from a rule whose key is its last `k` chars,
  // or null if the change reaches further back than that
  const needs = function (p, k) {
    if (k < p.w.length - p.c || k > p.w.length) {
      return null
    }
    return p.w2.slice(p.w.length - k)
  };

  // does this rule produce the right answer for this word?
  const works = function (p, rule) {
    return p.w.slice(0, p.w.length - rule.k) + rule.add === p.w2
  };

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
    let min = opts.min || 0;
    let words = pairs.map(([w, w2]) => ({ w, w2, c: commonPrefix(w, w2), strict: strict.has(w) }));
    let memo = new Map();
    let rules = {};
    let ex = {};

    // returns { cost, apply } for the sub-trie at suffix `suff`, given the rule it inherits
    const node = function (suff, list, inherited) {
      // an inherited rule that helps nothing down here is the same as no rule at all
      if (inherited && !list.some(p => needs(p, inherited.k) === inherited.add)) {
        inherited = null;
      }
      let key = suff + '|' + (inherited ? inherited.k + ':' + inherited.add : '');
      if (memo.has(key)) {
        return memo.get(key)
      }
      // rules that could be keyed at this suffix, and how many words each would serve
      let candidates = new Map();
      // the word that *is* this suffix, and the sub-tries by preceding character
      let whole = null;
      let kids = new Map();
      list.forEach(p => {
        let add = needs(p, suff.length);
        if (add !== null) {
          candidates.set(add, (candidates.get(add) || 0) + 1);
        }
        if (p.w.length === suff.length) {
          whole = p;
        } else {
          let char = p.w[p.w.length - suff.length - 1];
          if (!kids.has(char)) {
            kids.set(char, []);
          }
          kids.get(char).push(p);
        }
      });

      // total cost of governing this sub-trie with `rule`
      const option = function (rule, placed) {
        let total = placed && !isFree(suff, rule.add) ? cost(suff, rule.add) : 0;
        let exceptions = 0;
        let parts = [];
        let wholeEx = false;
        if (whole && !(rule && works(whole, rule))) {
          if (whole.strict) {
            return { cost: Infinity }
          }
          wholeEx = true;
          total += cost(whole.w, whole.w2);
          exceptions += 1;
        }
        for (let [char, sub] of kids) {
          let res = node(char + suff, sub, rule);
          total += res.cost;
          exceptions += res.exceptions;
          parts.push(res);
        }
        return { cost: total, exceptions, rule, placed, wholeEx, parts }
      };

      let best = option(inherited, false);
      for (let [add, count] of candidates) {
        // a whole-word rule is just an exception in disguise; it is always allowed
        let isWhole = whole !== null && add === whole.w2;
        if (count < min && !isWhole) {
          continue
        }
        let o = option({ k: suff.length, add }, true);
        // on a tie in bytes, prefer fewer exceptions - a rule packs better, and generalizes
        // (unless the rule only got in under the whole-word exemption)
        let tie = o.cost === best.cost && o.exceptions < best.exceptions && count >= min;
        if (o.cost < best.cost || tie) {
          best = o;
        }
      }
      let out = {
        cost: best.cost,
        exceptions: best.exceptions,
        apply: function () {
          if (best.placed) {
            rules[suff] = best.rule.add;
          }
          if (best.wholeEx) {
            ex[whole.w] = whole.w2;
          }
          best.parts.forEach(part => part.apply());
        },
      };
      memo.set(key, out);
      return out
    };

    if (words.length > 0) {
      node('', words, null).apply();
    }
    return { rules, ex }
  };

  const isPair = a => Array.isArray(a) && typeof a[0] === 'string' && typeof a[1] === 'string';

  // drop pairs that can't be learned:
  //  - non-strings, or words with characters the packed format reserves
  //  - repeated left-side words (a word can only become one thing)
  //  - repeated right-side words, unless {reverse:false} (one-way models can have them)
  const validate = function (pairs = [], opts = {}) {
    let left = new Set();
    let right = new Set();
    return pairs.filter(a => {
      if (!isPair(a) || reserved.test(a[0]) || reserved.test(a[1])) {
        return false
      }
      if (left.has(a[0]) || (opts.reverse !== false && right.has(a[1]))) {
        return false
      }
      left.add(a[0]);
      right.add(a[1]);
      return true
    })
  };

  const defaults = {
    min: 0,
    reverse: true,
    verbose: false,
  };

  const learn = function (input = [], opts = {}) {
    opts = Object.assign({}, defaults, opts);
    // left side must be unique. The right side may repeat ('poner'/'ponerse' → 'puesto'),
    // but only the first pair is used when learning the reverse direction.
    let pairs = validate(input, { reverse: false });
    if (opts.verbose && pairs.length < input.length) {
      console.warn(`suffix-thumb: skipped ${input.length - pairs.length} pairs (repeated, or unencodable)`); // eslint-disable-line
    }
    let firstFor = {};
    pairs.forEach(a => {
      if (!firstFor.hasOwnProperty(a[1])) {
        firstFor[a[1]] = a[0];
      }
    });
    // pairs that are not the reverse-target of their right side can't live in `ex`,
    // since reverse() flips it. They are stored as whole-word rules in `fwd` instead.
    let strict = new Set(pairs.filter(a => firstFor[a[1]] !== a[0]).map(a => a[0]));

    // forward direction
    let fwd = solve(pairs, opts, undefined, strict);
    let both = {};
    let rev = { rules: {}, ex: {} };
    if (opts.reverse !== false) {
      // backward direction - a rule that is the mirror of a forward rule is free, and shared
      let revPairs = Object.keys(firstFor).map(w2 => [w2, firstFor[w2]]);
      let isFree = (key, add) => fwd.rules[add] === key;
      rev = solve(revPairs, opts, isFree);
      Object.keys(rev.rules).forEach(key => {
        let add = rev.rules[key];
        if (fwd.rules[add] === key) {
          both[add] = key;
          delete fwd.rules[add];
          delete rev.rules[key];
        }
      });
    }
    // exceptions are keyed by the left side, and work in both directions.
    // (a backward exception belongs to the first pair for that right-side word)
    let ex = {};
    pairs.forEach(([w, w2]) => {
      if (fwd.ex.hasOwnProperty(w) || (rev.ex.hasOwnProperty(w2) && firstFor[w2] === w)) {
        ex[w] = w2;
      }
    });
    return {
      fwd: fwd.rules,
      both,
      rev: rev.rules,
      ex,
    }
  };

  // apply a model to one word:
  //   1. whole-word exceptions
  //   2. the longest suffix with a rule (a rule may match the entire word)
  //   3. the '' rule, if any, as a fallback (a plain append)
  //   4. otherwise, the word is returned unchanged
  const convert = function (str = '', model = {}) {
    let { ex = {}, fwd = {}, both = {} } = model;
    if (ex.hasOwnProperty(str)) {
      return ex[str]
    }
    for (let len = str.length; len >= 0; len -= 1) {
      let suff = str.slice(str.length - len);
      let stem = str.slice(0, str.length - len);
      if (fwd.hasOwnProperty(suff)) {
        return stem + fwd[suff]
      }
      if (both.hasOwnProperty(suff)) {
        return stem + both[suff]
      }
    }
    return str
  };

  const flipObj = function (obj = {}) {
    return Object.entries(obj).reduce((h, a) => {
      h[a[1]] = a[0];
      return h
    }, {})
  };

  // swap the direction of a model
  const reverse = function (model = {}) {
    return {
      reversed: true,
      // these two work both ways
      both: flipObj(model.both),
      ex: flipObj(model.ex),
      // and the one-way rules trade places
      fwd: model.rev || {},
      rev: model.fwd || {},
    }
  };

  // write a list of keys as a suffix-trie:
  //    ltador, nzador, epador   →   ador{lt,nz,ep}
  //    ero, ntonero             →   ero{,nton}      (an empty entry means the shared suffix is itself a key)
  // a suffix is only factored-out when the braces pay for themselves.
  const packKeys = function (keys) {
    let root = { kids: new Map(), end: false };
    keys.forEach(k => {
      let n = root;
      for (let i = k.length - 1; i >= 0; i -= 1) {
        if (!n.kids.has(k[i])) {
          n.kids.set(k[i], { kids: new Map(), end: false });
        }
        n = n.kids.get(k[i]);
      }
      n.end = true;
    });
    // every key beneath a node, written out in full
    const flat = function (n, suff) {
      let out = n.end ? [suff] : [];
      n.kids.forEach((kid, char) => out.push(...flat(kid, char + suff)));
      return out
    };
    const pack = function (n) {
      let parts = n.end && n.kids.size > 0 ? [''] : [];
      n.kids.forEach((kid, char) => {
        // collapse single-child chains into one string
        let chain = char;
        while (!kid.end && kid.kids.size === 1) {
          let [[c, k]] = kid.kids;
          chain = c + chain;
          kid = k;
        }
        let nested = chain + (kid.kids.size > 0 ? '{' + pack(kid) + '}' : '');
        let plain = flat(kid, chain).join(',');
        parts.push(plain.length <= nested.length ? plain : nested);
      });
      return parts.join(',')
    };
    return pack(root)
  };

  // group keys by their encoded value:   1as:chico,chino|2es:ton,ger
  const packSection = function (obj = {}) {
    let byVal = new Map();
    Object.keys(obj).forEach(k => {
      let val = encodeVal(k, obj[k]);
      if (!byVal.has(val)) {
        byVal.set(val, []);
      }
      byVal.get(val).push(k);
    });
    return [...byVal].map(([val, keys]) => val + ':' + packKeys(keys)).join('|')
  };

  // model → one string
  const compress = function (model = {}) {
    return sections.map(s => packSection(model[s])).join('~')
  };

  // suffix-trie → list of keys
  const unpackKeys = function (str, suff = '', out = []) {
    let i = 0;
    do {
      let chain = '';
      while (i < str.length && str[i] !== ',' && str[i] !== '{') {
        chain += str[i];
        i += 1;
      }
      if (str[i] === '{') {
        // find the matching brace
        let depth = 1;
        let j = i + 1;
        while (depth > 0) {
          if (str[j] === '{') {
            depth += 1;
          } else if (str[j] === '}') {
            depth -= 1;
          }
          j += 1;
        }
        unpackKeys(str.slice(i + 1, j - 1), chain + suff, out);
        i = j;
      } else {
        out.push(chain + suff);
      }
      i += 1; // step over the comma
    } while (i <= str.length)
    return out
  };

  const unpackSection = function (str = '') {
    let obj = {};
    if (!str) {
      return obj
    }
    str.split('|').forEach(group => {
      let i = group.indexOf(':');
      let val = group.slice(0, i);
      unpackKeys(group.slice(i + 1)).forEach(k => {
        obj[k] = decodeVal(k, val);
      });
    });
    return obj
  };

  // one string → model
  const uncompress = function (str = '') {
    if (typeof str !== 'string' || str[0] === '{') {
      throw new Error('suffix-thumb: uncompress expects a packed string. Models made before v6 must be learned again.')
    }
    let parts = str.split('~');
    let model = {};
    sections.forEach((s, i) => {
      model[s] = unpackSection(parts[i]);
    });
    return model
  };

  const cyan = str => '\x1b[36m' + str + '\x1b[0m';
  const blue = str => '\x1b[34m' + str + '\x1b[0m';

  const percent = (part, total) => {
    let num = (part / total) * 100;
    num = Math.round(num * 10) / 10;
    return num + '%'
  };

  const swap = (a) => [a[1], a[0]];

  const getNum = function (pairs, model) {
    let right = 0;
    pairs.forEach(a => {
      let have = convert(a[0], model);
      if (have === a[1]) {
        right += 1;
      } else {
        console.log('❌ ', a, '→ ' + have);
      }
    });
    return percent(right, pairs.length)
  };

  const test = function (pairs, model = {}) {
    pairs = validate(pairs);
    let fwdScore = getNum(pairs, model);
    let bkwdScore = getNum(pairs.map(swap), reverse(model));
    console.log(`${blue(fwdScore)}  -  🔄 ${cyan(bkwdScore)}`);
  };

  exports.compress = compress;
  exports.convert = convert;
  exports.learn = learn;
  exports.reverse = reverse;
  exports.test = test;
  exports.uncompress = uncompress;
  exports.validate = validate;

}));
