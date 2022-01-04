/* suffix-thumb 3.1.1 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('efrt')) :
  typeof define === 'function' && define.amd ? define(['exports', 'efrt'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.suffixThumb = {}, global.efrt));
})(this, (function (exports, efrt) { 'use strict';

  const prefix$1 = /^.([0-9]+)/;

  // handle compressed form of key-value pair
  const getKeyVal = function (word, model) {
    let val = model.exceptions[word];
    let m = val.match(prefix$1);
    if (m === null) {
      // return not compressed form
      return model.exceptions[word]
    }
    // uncompress it
    let num = Number(m[1]) || 0;
    let pre = word.substr(0, num);
    return pre + val.replace(prefix$1, '')
  };

  // get suffix-rules according to last char of word
  const getRules$1 = function (word, model) {
    let char = word[word.length - 1];
    let rules = model.rules[char] || [];
    if (rules.length === 0) {
      // do we have a generic suffix?
      rules = model.rules[''] || rules;
    }
    return rules
  };

  const convert = function (word, model) {
    // check list of irregulars
    if (model.exceptions.hasOwnProperty(word)) {
      return getKeyVal(word, model)
    }
    // try suffix rules
    const rules = getRules$1(word, model);
    for (let i = 0; i < rules.length; i += 1) {
      let suffix = rules[i][0];
      if (word.endsWith(suffix)) {
        let reg = new RegExp(suffix + '$');
        return word.replace(reg, rules[i][1])
      }
    }
    // return the original word unchanged
    return word
  };

  const max = 6;

  const getSuffixes = function (str = '') {
    let list = [];
    for (let i = max; i >= 0; i -= 1) {
      if (str.length - 1 <= i) {
        continue
      }
      let n = str.length - i - 1;
      let suffix = str.substring(n, n + str.length - 1);
      list.push(suffix);
    }
    return list
  };

  const getAll = function (arr) {
    const suffixes = {};
    arr.forEach((a) => {
      let [from, to] = a;
      let fromList = getSuffixes(from);
      fromList.push(''); //add a prepend-only option
      fromList.forEach((left) => {
        suffixes[left] = suffixes[left] || {};
        let toList = getSuffixes(to);
        toList.forEach((right) => {
          suffixes[left][right] = suffixes[left][right] || 0;
          suffixes[left][right] += 1;
        });
      });
    });
    return suffixes
  };

  const topChange = function (obj, from) {
    let keys = Object.keys(obj);
    let arr = keys.map((to) => {
      return {
        from: from,
        to: to,
        yes: obj[to],
      }
    });
    arr = arr.sort((a, b) => {
      if (a.yes > b.yes) {
        return -1
      } else if (a.yes < b.yes) {
        return 1
      }
      return 0
    });
    return arr
  };

  const findBest = function (suffixes) {
    let good = [];
    Object.keys(suffixes).forEach((left) => {
      let top = topChange(suffixes[left], left);
      if (top[0] && top[0].yes > 1) {
        good.push(top[0]);
      }
    });
    good = good.sort((a, b) => {
      if (a.yes > b.yes) {
        return -1
      } else if (a.yes < b.yes) {
        return 1
      }
      return 0
    });
    return good
  };

  const getScores = function (arr, pairs) {
    return arr.map((obj) => {
      let yes = 0;
      let no = 0;
      let exceptions = {};
      pairs.forEach((pair) => {
        if (pair[0].endsWith(obj.from)) {
          let reg = new RegExp(obj.from + '$');//unsafe
          let have = pair[0].replace(reg, obj.to);
          if (have === pair[1]) {
            yes += 1;
          } else {
            no += 1;
            exceptions[pair[0]] = pair[1];
          }
        }
      });
      return {
        from: obj.from,
        to: obj.to,
        yes: yes,
        no: no,
        percent: yes / (yes + no),
        exceptions: exceptions,
      }
    })
  };

  const rank = function (arr, pairs) {
    let scored = getScores(arr, pairs);
    // baseline filter
    scored = scored.filter((o) => {
      return o.yes > 1 && o.yes > o.no
    });
    // sort by # of positive
    scored = scored.sort((a, b) => {
      if (a.yes > b.yes) {
        return -1
      } else if (a.yes < b.yes) {
        return 1
      }
      return 0
    });
    return scored
  };

  // remove any redundant rules
  const squeeze = function (arr) {
    let redundant = {};
    arr.forEach((o, i) => {
      let downstream = arr.slice(i + 1, arr.length);
      downstream.forEach((d) => {
        if (d.from.endsWith(o.from)) {
          // also ensure the surviving one has no exceptions
          if (d.no === 0) {
            redundant[d.from] = true;
          }
        }
      });
    });
    // actually remove any redundant suffixes
    arr = arr.filter((o) => {
      return redundant.hasOwnProperty(o.from) === false
    });
    return arr
  };

  function reverse$1(str) {
    return str.split('').reverse().join('')
  }

  const fmtRules = function (rules) {
    // sort by length, then by suffix
    rules = rules.sort((a, b) => {
      if (a.from.length > b.from.length) {
        return -1
      } else if (a.from.length < b.from.length) {
        return 1
      }
      a = reverse$1(a.from);
      b = reverse$1(b.from);
      if (a > b) {
        return 1
      } else if (a < b) {
        return -1
      }
      return 0
    });
    return rules.map((o) => [o.from, o.to])
  };

  const format = function (rules, pairs) {
    let exceptions = {};
    rules.forEach((rule) => {
      Object.assign(exceptions, rule.exceptions);
    });
    rules = fmtRules(rules);

    // find remaining pairs with no rule
    let remaining = pairs.filter((pair) => {
      if (exceptions.hasOwnProperty(pair[0])) {
        return false
      }
      // console.log(rules.find((rule) => pair[0].endsWith(rule.from)))
      if (rules.find((rule) => pair[0].endsWith(rule.from))) {
        return false
      }
      return true
    });
    // add them to exceptions list
    remaining.forEach(a => {
      exceptions[a[0]] = a[1];
    });
    return {
      rules,
      exceptions: exceptions,
    }
  };

  const firstPass = function (pairs) {
    pairs = pairs.filter((a) => a && a[0] && a[1]);
    // look at all patterns
    const suffixes = getAll(pairs);
    // look for the greatest patterns
    let best = findBest(suffixes);
    // run pattern against the pairs
    let rules = rank(best, pairs);
    // console.log(rules)
    // remove duplicates
    rules = squeeze(rules);
    // nice result format
    let res = format(rules, pairs);
    // console.log(res)
    return res
  };

  const reduceExceptions = function (res) {
    let final = {};
    let { rules, exceptions } = res;
    Object.keys(exceptions).forEach(k => {
      let found = rules.find((rule) => {
        return k.endsWith(rule[0])
      });
      // no rule applies
      if (!found) {
        final[k] = exceptions[k];
        return
      }
      let tmp = k.replace(found[0], found[1]);
      // did we do it wrong?
      if (tmp !== exceptions[k]) {
        final[k] = exceptions[k]; //still an exception then
      }
    });
    return final
  };


  const postProcess = function (res) {
    // some exceptions are not anymore
    res.exceptions = reduceExceptions(res);
    return res
  };

  // index rules by last-char
  const indexRules = function (rules) {
    let byChar = {};
    rules.forEach((a) => {
      let suff = a[0] || '';
      let char = suff[suff.length - 1] || '';
      byChar[char] = byChar[char] || [];
      byChar[char].push(a);
    });
    return byChar
  };

  const unIndex = function (byChar) {
    let arr = [];
    Object.keys(byChar).forEach(k => {
      arr = arr.concat(byChar[k]);
    });
    return arr
  };

  const sortRules = function (rules) {
    rules = rules.sort((a, b) => {
      if (a[0].length > b[0].length) {
        return -1
      } else if (a[0].length < b[0].length) {
        return 1
      }
      return 0
    });
    return rules
  };

  // add all reverse-exceptions
  const addInverse = function (model, pairs) {
    // create a reverse model
    let tmp = Object.assign({}, model);
    tmp.rules = indexRules(model.rules);
    let rev = reverse(tmp);
    // look for exceptions
    pairs.forEach(a => {
      let [left, right] = a;
      if (convert(right, rev) !== left) {
        // console.log(a)
        model.exceptions[a[0]] = a[1];
      }
    });
    // console.log(convert('relearn', rev))
    return model
  };

  const secondPass = function (res, pairs, opts) {
    // remove redundant exceptions
    res = postProcess(res);
    // turn some exceptions into singleton suffix-rules
    // res = toRules(res, pairs)
    if (opts.inverse !== false) {
      res = addInverse(res, pairs);
    }
    return res
  };

  // make sure inputs are not impossible to square-up
  const validate = function (pairs, opts = {}) {
    let left = {};
    let right = {};
    pairs = pairs.filter(a => {
      if (left[a[0]] !== undefined) {
        if (opts.verbose) {
          console.warn('Duplicate left side:');
          console.log('  1.', [a[0], left[a[0]]]);
          console.log('  2.', a);
        }
        return false
      }
      if (right[a[1]] !== undefined) {
        if (opts.verbose) {
          console.warn('Duplicate right side:');
          console.log('  1.', [right[a[1]], a[1]]);
          console.log('  2.', a);
        }
        if (opts.inverse === false) {
          return true //allow it
        }
        return false
      }
      left[a[0]] = a[1];
      right[a[1]] = a[0];
      return true
    });
    return pairs
  };

  const learn = function (pairs, opts = {}) {
    // ensure input pairs are possible
    pairs = validate(pairs, opts);
    // create basic {rules, exceptions}
    let res = firstPass(pairs);
    // optimize it further
    res = secondPass(res, pairs, opts);
    // organize rules by their suffix char
    res.rules = indexRules(res.rules);
    return res
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

  // remove shared data in key-val pairs
  // uses an ad-hoc run-length encoding format 
  // {walk: walking}  -> {walk: '.4ing'}
  const pressObj = function (obj) {
    let res = {};
    Object.keys(obj).forEach((k) => {
      let val = obj[k];
      let prefix = findOverlap(k, val);
      if (prefix.length < 2) {
        res[k] = val;
        return
      }
      let out = '.' + prefix.length + val.substr(prefix.length);
      res[k] = out;
    });
    return res
  };

  const toObj = (rules) => {
    return rules.reduce((h, a) => {
      h[a[0]] = a[1];
      return h
    }, {})
  };

  const packRules = function (rules) {
    rules = unIndex(rules);
    rules = toObj(rules);
    rules = pressObj(rules);
    rules = efrt.pack(rules);
    return rules
  };

  const compress = function (model = {}) {
    model.rules = packRules(model.rules);
    // compress exceptions
    model.exceptions = pressObj(model.exceptions);
    model.exceptions = efrt.pack(model.exceptions);
    return model
  };

  const prefix = /^.([0-9]+)/;

  const unEncode = function (obj) {
    Object.keys(obj).forEach(k => {
      let val = obj[k];
      let m = val.match(prefix);
      if (m !== null) {
        let num = Number(m[1]) || 0;
        let pre = k.substring(0, num);
        let full = pre + val.replace(prefix, '');
        obj[k] = full;
      }
    });
    return obj
  };

  const unpackRules = function (rules) {
    if (!rules) {
      return {}
    }
    // un-do our trie compression
    rules = efrt.unpack(rules);
    // un-do our run-length encoding
    rules = unEncode(rules);
    // turn into an array
    rules = Object.entries(rules);
    // ensure they are longest-first order
    rules = sortRules(rules);
    // index by end-char
    rules = indexRules(rules);
    return rules
  };


  const uncompress = function (model = {}) {
    if (typeof model.exceptions === 'string') {
      model.exceptions = efrt.unpack(model.exceptions);
      model.exceptions = unEncode(model.exceptions);
    }
    if (typeof model.rules === 'string') {
      model.rules = unpackRules(model.rules);
    }
    return model
  };

  const reverseObj = function (obj) {
    return Object.entries(obj).reduce((h, a) => {
      h[a[1]] = a[0];
      return h
    }, {})
  };

  const reverseArr = function (arr) {
    return arr.map(a => [a[1], a[0]])
  };

  const reverse = function (model) {
    let allRules = [];
    Object.keys(model.rules).forEach(k => {
      allRules = allRules.concat(reverseArr(model.rules[k]));
    });
    allRules = sortRules(allRules);
    let rules = indexRules(allRules);
    let exceptions = reverseObj(model.exceptions);
    return {
      rules,
      exceptions
    }
  };

  // get suffix-rules according to last char of word
  const getRules = function (word, model) {
    let char = word[word.length - 1];
    let rules = model.rules[char] || [];
    if (rules.length === 0) {
      // do we have a generic suffix?
      rules = model.rules[''] || rules;
    }
    return rules
  };

  const debug = function (word, model) {
    if (model.exceptions.hasOwnProperty(word)) {
      let obj = {};
      obj[word] = model.exceptions[word];
      return { found: 'exception', exception: obj }
    }
    const rules = getRules(word, model);
    for (let i = 0; i < rules.length; i += 1) {
      let suffix = rules[i][0];
      if (word.endsWith(suffix)) {
        return { found: 'rule', rule: rules[i] }
      }
    }
    return { found: null }
  };

  Object.defineProperty(exports, 'pack', {
    enumerable: true,
    get: function () { return efrt.pack; }
  });
  Object.defineProperty(exports, 'unpack', {
    enumerable: true,
    get: function () { return efrt.unpack; }
  });
  exports.compress = compress;
  exports.convert = convert;
  exports.debug = debug;
  exports.learn = learn;
  exports.reverse = reverse;
  exports.uncompress = uncompress;
  exports.validate = validate;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
