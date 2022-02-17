/* suffix-thumb 4.0.2 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.suffixThumb = {}));
})(this, (function (exports) { 'use strict';

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
  const getRules$1 = function (word, rules = {}) {
    let char = word[word.length - 1];
    let list = rules[char] || [];
    // do we have a generic suffix?
    if (rules['']) {
      list = list.concat(rules['']);
    }
    return list
  };

  const convert = function (word, model, debug) {
    // check list of irregulars
    if (model.exceptions.hasOwnProperty(word)) {
      if (debug) {
        console.log("exception, ", word, model.exceptions[word]);
      }
      return getKeyVal(word, model)
    }
    // if model is reversed, try rev rules
    let rules = model.rules;
    if (model.reversed) {
      rules = model.rev;
    }
    // try suffix rules
    rules = getRules$1(word, rules);
    for (let i = 0; i < rules.length; i += 1) {
      let suffix = rules[i][0];
      if (word.endsWith(suffix)) {
        if (debug) {
          console.log("rule, ", rules[i]);
        }
        let reg = new RegExp(suffix + '$');
        return word.replace(reg, rules[i][1])
      }
    }
    if (debug) {
      console.log(' x - ' + word);
    }
    // return the original word unchanged
    return word
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

  let compress$1 = function (key, val) {
    let prefix = findOverlap(key, val);
    if (prefix.length < 1) {
      return [key, val]
    }
    let out = prefix.length + val.substr(prefix.length);
    return [key, out]
  };
  // console.log(compress('fixture', 'fixturing'))

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

  // remove shared data in key-val pairs
  // uses an ad-hoc run-length encoding format 
  // {walk: walking}  -> {walk: '.4ing'}
  const pressPairs = function (pairs) {
    pairs = pairs.map(a => {
      return compress$1(a[0], a[1]).join('|')
    });
    return pairs.join(',')
  };

  const compress = function (model = {}) {
    model = Object.assign({}, model);

    // compress fwd rules
    model.rules = unIndex(model.rules);
    model.rules = pressPairs(model.rules);
    // compress reverse rules
    if (model.rev) {
      model.rev = unIndex(model.rev);
      model.rev = pressPairs(model.rev);
    }

    // compress exceptions
    model.exceptions = Object.entries(model.exceptions);
    model.exceptions = pressPairs(model.exceptions);
    return model
  };

  const prefix = /^([0-9]+)/;

  const expand = function (key = '', val = '') {
    val = String(val);
    let m = val.match(prefix);
    if (m === null) {
      return [key, val]
    }
    let num = Number(m[1]) || 0;
    let pre = key.substring(0, num);
    let full = pre + val.replace(prefix, '');
    return [key, full]
  };

  const toArray = function (txt) {
    const pipe = /\|/;
    return txt.split(/,/).map(str => {
      let a = str.split(pipe);
      return expand(a[0], a[1])
    })
  };

  const uncompress = function (model = {}) {
    model = Object.assign({}, model);

    // compress fwd rules
    model.rules = toArray(model.rules);
    model.rules = indexRules(model.rules);

    // compress reverse rules
    if (model.rev) {
      model.rev = toArray(model.rev);
      model.rev = indexRules(model.rev);
    }

    // compress exceptions
    model.exceptions = toArray(model.exceptions);
    model.exceptions = model.exceptions.reduce((h, a) => {
      h[a[0]] = a[1];
      return h
    }, {});
    return model
  };

  // console.log(expand('fixture', '6ing'))
  // console.log(toArray('heard|4'))

  const reverseObj = function (obj) {
    return Object.entries(obj).reduce((h, a) => {
      h[a[1]] = a[0];
      return h
    }, {})
  };

  const reverse = function (model) {
    let { rules, exceptions, rev } = model;
    exceptions = reverseObj(exceptions);
    return {
      reversed: !Boolean(model.reversed),//toggle this
      rules,
      exceptions,
      rev
    }
  };

  // approximate file-size of given text
  const fileSize = (txt) => {
    if (!txt) {
      return '0kb'
    }
    if (typeof txt === 'object') {
      txt = JSON.stringify(txt);
    }
    let unit = 'kb';
    let num = Buffer.byteLength(txt, 'utf8');
    num = num / 1000;
    if (num > 1000) {
      unit = 'mb';
      num = num / 1000;
    }
    num = Math.round(num * 10) / 10;//round it
    return num.toLocaleString() + unit
  };

  // get suffix-rules according to last char of word
  const getRules = function (word, modelRules) {
    let char = word[word.length - 1];
    let rules = modelRules[char] || [];
    // if (modelRules['']) {
    //   // do we have a generic suffix?
    //   rules = rules.concat(modelRules[''])
    // }
    return rules
  };


  const classify = function (str, model, debug) {
    const l = 'Left';
    const r = 'Right';
    // check known exceptions
    if (model.exceptions.hasOwnProperty(str)) {
      return l
    }
    let list = Object.entries(model.exceptions);
    for (let i = 0; i < list.length; i += 1) {
      if (list[i][1] === str) {
        return r
      }
    }
    // check rules
    let rules = getRules(str, model.rules);
    for (let i = 0; i < rules.length; i += 1) {
      if (str.endsWith(rules[i][0])) {
        return l
      }
    }
    rules = getRules(str, model.rev);
    for (let i = 0; i < rules.length; i += 1) {
      if (str.endsWith(rules[i][0])) {
        return r
      }
    }
    // check weak-side of rules
    rules = getRules(str, model.rules);
    for (let i = 0; i < rules.length; i += 1) {
      if (str.endsWith(rules[i][1])) {
        return r
      }
    }
    rules = getRules(str, model.rev);
    for (let i = 0; i < rules.length; i += 1) {
      if (str.endsWith(rules[i][1])) {
        return l
      }
    }
    return null
  };

  const green = str => '\x1b[32m' + str + '\x1b[0m';
  const red = str => '\x1b[31m' + str + '\x1b[0m';
  const blue = str => '\x1b[34m' + str + '\x1b[0m';
  const yellow = str => '\x1b[33m' + str + '\x1b[0m';
  const dim = str => '\x1b[2m' + str + '\x1b[0m';

  const testFwd = function (pairs, model) {
    let wrong = 0;
    pairs.forEach((a) => {
      let created = convert(a[0], model);
      if (created !== a[1]) {
        wrong += 1;
        console.log(red('error:'), yellow(a[0] + ' →' + created));
      }
    });
    if (wrong === 0) {
      console.log(green(`  ✓ forward`));
    } else {
      console.log(red(` ✗ ${wrong} `) + 'errors\n');
    }
    return wrong
  };

  const testBack = function (pairs, model) {
    let wrong = 0;
    let rev = reverse(model);
    pairs.forEach((a) => {
      let created = convert(a[1], rev);
      if (created !== a[0]) {
        wrong += 1;
        console.log(red('  rev ✗: '), yellow(a[1] + ' → ' + created));
      }
    });
    if (wrong === 0) {
      console.log(green(`  ✓ backward`));
    } else {
      console.log(red(`  ✗ ${wrong} `) + 'errors reversed\n');
    }
    return wrong
  };

  const testSize = function (pairs, model) {
    let before = fileSize(pairs);
    let smol = compress(model);
    let after = fileSize(smol);
    console.log(`  ${dim(before)} -> ${blue(after)}`);
  };

  const stats = function (model) {
    let rules = 0;
    Object.keys(model.rules).forEach(k => rules += model.rules[k].length);
    let rev = 0;
    Object.keys(model.rev || {}).forEach(k => rev += model.rev[k].length);
    let exc = Object.keys(model.exceptions).length;
    console.log(`  ${blue(rules.toLocaleString())} rules,  ${yellow(rev.toLocaleString())} reversed,  ${blue(exc.toLocaleString())} exceptions`);
  };

  const test = function (pairs, opts) {
    console.log('\n');
    console.log(yellow(pairs.length.toLocaleString()) + ` pairs -  ${dim(fileSize(pairs))}`);
    let begin = new Date();
    let model = learnBoth(pairs, opts);
    let end = new Date();
    console.log('   ', (end.getTime() - begin.getTime()) / 1000, 'seconds');

    console.log(yellow('\nSize:'));
    stats(model);
    testSize(pairs, model);

    model = compress(model);
    model = uncompress(model);

    console.log(yellow('\nForward:'));
    testFwd(pairs, model);
    console.log(yellow('\nBackward:'));
    testBack(pairs, model);
    // hmm
    // console.log(yellow('\nClassify:'))
    // testSide(pairs, model, 'Left')
    // testSide(pairs, model, 'Right')

  };

  // make sure inputs are not impossible to square-up
  const validate = function (pairs, opts = {}) {
    let left = {};
    let right = {};
    pairs = pairs.filter(a => {
      if (left[a[0]] !== undefined) {
        if (opts.debug) {
          console.warn('Duplicate left side:');
          console.log('  1.', [a[0], left[a[0]]]);
          console.log('  2.', a);
        }
        return false
      }
      if (right[a[1]] !== undefined) {
        if (opts.debug) {
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
    return list.reverse()
  };

  const getDiff = function (left, right, suff) {
    suff = suff.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    let reg = new RegExp(suff + '$');
    let stem = left.replace(reg, '');
    if (!right.startsWith(stem)) {
      return
    }
    stem = stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let start = new RegExp('^' + stem);
    let rest = right.replace(start, '');
    return { from: suff, to: rest, id: suff + '|' + rest, reg }
  };

  const unique = function (arr) {
    let set = new Set();
    return arr.filter(a => {
      if (set.has(a.id)) {
        return false
      }
      set.add(a.id);
      return true
    })
  };

  const getAll = function (arr) {
    let res = [];
    arr.forEach((a) => {
      let [left, right] = a;
      let list = getSuffixes(left);
      list.forEach(suff => {
        let diff = getDiff(left, right, suff);
        if (diff) {
          res.push(diff);
        }
      });
    });
    res = unique(res);
    return res
  };


  // console.log(getAll([['laughed', 'laughing']]))

  const noDupes = function (rules) {
    let already = new Set();
    rules = rules.filter(r => {
      if (already.has(r.from)) {
        return false
      }
      already.add(r.from);
      return true
    });
    return rules
  };

  const cleanup = function (rules) {
    // only helpful ones
    rules = rules.filter(r => r.yes > 0 && r.yes > r.no);
    // one rule per suffix
    rules = noDupes(rules);
    return rules
  };

  const getCounts = function (rule, pairs) {
    let yes = 0;
    let no = 0;
    pairs.forEach(pair => {
      let [left, right] = pair;
      if (!rule.reg.test(left)) {
        return
      }
      // console.log(replace(left, rule.from, rule.to), left.replace(rule.reg, rule.to))
      // if (replace(left, rule.from, rule.to) === right) {
      if (left.replace(rule.reg, rule.to) === right) {
        yes += 1;
      } else {
        no += 1;
      }
    });
    return { yes, no }
  };

  const score = function (rules, pairs, opts = {}) {
    rules = rules.map(rule => {
      let { yes, no } = getCounts(rule, pairs);
      rule.yes = yes;
      rule.no = no;
      delete rule.id;
      return rule
    });
    // worst-to-best
    rules = rules.sort((a, b) => {
      if (a.yes > b.yes) {
        return 1
      } else if (a.yes < b.yes) {
        return -1
      }
      return 0
    });
    return rules
  };

  const findRules = function (pairs, opts = {}) {
    let rules = getAll(pairs);
    rules = score(rules, pairs, opts);
    rules = cleanup(rules);
    return rules
  };

  const updateRules = function (rules, pairs, opts) {
    rules = score(rules, pairs, opts);
    rules = cleanup(rules);
    return rules
  };

  const trimPairs = function (pairs, rule) {
    let { reg, to } = rule;
    let done = [];
    let remain = pairs.filter(pair => {
      let [left, right] = pair;
      if (left.match(reg)) {
        if (left.replace(reg, to) === right) {
          done.push(pair);
          return false //done with it
        }
      }
      return true // keep it
    });
    return { remain, done }
  };
  // remove any rules that challenge existing pairs
  const trimRules = function (rules, pairsDone) {
    return rules.filter(r => {
      for (let i = 0; i < pairsDone.length; i += 1) {
        let pair = pairsDone[i];
        if (r.reg.test(pair[0]) && pair[0].replace(r.reg, r.to) !== pair[1]) {
          // console.log('banned rule:', r)
          return false
        }
      }
      return true
    })
  };

  const learn = function (pairs, opts = {}) {
    pairs = validate(pairs, opts);
    let rules = findRules(pairs);
    let pairsLeft = pairs;
    let pairsDone = [];
    let chosen = [];

    // pick our top rule
    while (pairsLeft.length > 0 && rules.length > 0) {
      let rule = rules.pop();
      chosen.push([rule.from, rule.to]);

      // remove now-covered pairs
      let res = trimPairs(pairsLeft, rule);
      pairsLeft = res.remain;
      pairsDone = pairsDone.concat(res.done);

      // remove now-unsafe rules
      rules = trimRules(rules, pairsDone);
      // re-rank our rules
      rules = updateRules(rules, pairsLeft, opts);

      // logging
      if (opts.debug) {
        console.log(`\n${rule.from} -> ${rule.to || "''"}`);
        console.log(`    \x1b[32m +${res.done.length.toLocaleString()} pairs\x1b[0m`);
        console.log('   ', pairsLeft.length, 'remaining');
        console.log('   ', rules.length, 'rules left');
      }
    }

    // turn em upside-down
    chosen = chosen.reverse();

    // remaining pairs are exceptions
    let exceptions = pairsLeft.reduce((h, a) => {
      h[a[0]] = a[1];
      return h
    }, {});

    return {
      rules: chosen,
      exceptions
    }
  };

  const mergeExceptions = function (fwd, bkwd) {
    Object.entries(bkwd).forEach(b => {
      fwd[b[1]] = b[0]; //reverse
    });
    return fwd
  };

  const learnBoth = function (pairs, opts = {}) {
    let fwd = learn(pairs, opts);
    // learn backward too?
    if (opts.reverse !== false) {
      pairs = pairs.map(a => [a[1], a[0]]);
      let bkwd = learn(pairs, opts);
      // merge exceptions
      fwd.exceptions = mergeExceptions(fwd.exceptions, bkwd.exceptions);
      // add rules
      fwd.rev = indexRules(bkwd.rules);
    }
    fwd.rules = indexRules(fwd.rules);
    return fwd
  };

  exports.classify = classify;
  exports.compress = compress;
  exports.convert = convert;
  exports.learn = learnBoth;
  exports.reverse = reverse;
  exports.test = test;
  exports.uncompress = uncompress;
  exports.validate = validate;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
