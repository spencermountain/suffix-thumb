/* spencermountain/suffix-thumb 6.0.0 Apache 2.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.suffixThumb = {}));
})(this, (function (exports) { 'use strict';

  // estimated byte-cost of one `key → val` entry, once packed by ./compress
  // (mirrors the run-length prefix encoding in compress/key-val.js)
  const cost = function (key, val) {
    let i = 0;
    while (i < key.length && i < val.length && key[i] === val[i]) {
      i += 1;
    }
    let encoded = i > 0 ? String(i).length + (val.length - i) : val.length;
    return key.length + encoded + 2 // separator chars
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
        let parts = [];
        let wholeEx = false;
        if (whole && !(rule && works(whole, rule))) {
          if (whole.strict) {
            return { cost: Infinity }
          }
          wholeEx = true;
          total += cost(whole.w, whole.w2);
        }
        for (let [char, sub] of kids) {
          let res = node(char + suff, sub, rule);
          total += res.cost;
          parts.push(res);
        }
        return { cost: total, rule, placed, wholeEx, parts }
      };

      let best = option(inherited, false);
      for (let [add, count] of candidates) {
        // a whole-word rule is just an exception in disguise; it is always allowed
        let isWhole = whole !== null && add === whole.w2;
        if (count < min && !isWhole) {
          continue
        }
        let o = option({ k: suff.length, add }, true);
        if (o.cost < best.cost) {
          best = o;
        }
      }
      let out = {
        cost: best.cost,
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

  const defaults = {
    min: 0,
    reverse: true,
  };

  const isPair = a => Array.isArray(a) && typeof a[0] === 'string' && typeof a[1] === 'string';

  const learn = function (input = [], opts = {}) {
    opts = Object.assign({}, defaults, opts);
    // left side must be unique. The right side may repeat ('poner'/'ponerse' → 'puesto'),
    // but only the first pair is used when learning the reverse direction.
    let pairs = [];
    let seen = new Set();
    let firstFor = {};
    input.forEach(a => {
      if (!isPair(a) || seen.has(a[0])) {
        return
      }
      seen.add(a[0]);
      pairs.push(a);
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

  // make sure inputs are not impossible to square-up
  const validate = function (pairs, opts = {}) {
    let left = new Set();
    let right = new Set();
    pairs = pairs.filter(a => {
      if (left.has(a[0])) {
        // console.log('dupe', a)
        return false
      }
      if (right.has(a[1])) {
        // console.log('dupe', a)
        return false
      }
      left.add(a[0]);
      right.add(a[1]);

      // ensure pairs are aligned by prefix
      // if (a[0].substring(0, 1) !== a[1].substring(0, 1)) {
      //   console.log('pair not aligned at prefix:', a)
      //   return false
      // }
      return true
    });
    return pairs
  };

  // longest common prefix
  const findOverlap = (from, to) => {
    let all = [];
    for (let i = 0; i < from.length; i += 1) {
      if (from[i] === to[i]) {
        all.push(from[i]);
      } else {
        break
      }
    }
    return all.join('')
  };

  // run-length encode any shared prefix
  let compress$1 = function (key, val) {
    let prefix = findOverlap(key, val);
    if (prefix.length < 1) {
      return val
    }
    let out = prefix.length + val.substr(prefix.length);
    return out
  };
  // console.log(compress('fixture', 'fixturing'))

  const pack = function (obj) {
    let byVal = {};
    Object.keys(obj).forEach(k => {
      let val = obj[k];
      byVal[val] = byVal[val] || [];
      byVal[val].push(k);
    });
    let out = [];
    Object.keys(byVal).forEach(val => {
      out.push(`${val}:${byVal[val].join(',')}`);
    });
    return out.join('¦')
  };

  const packObj = function (obj = {}) {
    let tmp = {};
    Object.keys(obj).forEach(k => {
      let val = compress$1(k, obj[k]);// compress any shared prefix
      tmp[k] = val;
    });
    return pack(tmp)
  };

  const compress = function (model) {
    let out = {
      fwd: packObj(model.fwd),
      both: packObj(model.both),
      rev: packObj(model.rev),
      ex: packObj(model.ex),
    };
    return out
  };


  // let model = {
  //   fwd: {
  //     foo: 'food',
  //     bar: 'bard',
  //     cool: 'nice'
  //   }
  // }
  // console.log(compress(model))

  const prefix = /^([0-9]+)/;

  const toObject = function (txt) {
    let obj = {};
    if (!txt) {
      return obj
    }
    txt.split('¦').forEach(str => {
      let [key, vals] = str.split(':');
      vals = (vals || '').split(',');
      vals.forEach(val => {
        obj[val] = key;
      });
    });
    return obj
  };

  const growObject = function (key = '', val = '') {
    val = String(val);
    let m = val.match(prefix);
    if (m === null) {
      return val
    }
    let num = Number(m[1]) || 0;
    let pre = key.substring(0, num);
    let full = pre + val.replace(prefix, '');
    return full
  };

  const unpackOne = function (str) {
    let obj = toObject(str);
    return Object.keys(obj).reduce((h, k) => {
      h[k] = growObject(k, obj[k]);
      return h
    }, {})
  };

  const uncompress = function (model = {}) {
    if (typeof model === 'string') {
      model = JSON.parse(model);
    }
    model.fwd = unpackOne(model.fwd || '');
    model.both = unpackOne(model.both || '');
    model.rev = unpackOne(model.rev || '');
    model.ex = unpackOne(model.ex || '');
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
