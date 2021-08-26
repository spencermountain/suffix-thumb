/* suffix-thumb 2.0.0 MIT */
const prefix = /^.([0-9]+)/;

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
};

// handle compressed form of key-value pair
const getKeyVal = function (word, model) {
  let val = model.exceptions[word];
  let m = val.match(prefix);
  if (m === null) {
    // return not compressed form
    return model.exceptions[word]
  }
  // uncompress it
  let num = Number(m[1]) || 0;
  let pre = word.substr(0, num);
  return pre + val.replace(prefix, '')
};

// get suffix-rules according to last char of word
const getRules = function (word, model) {
  // support old uncompressed format
  if (isArray(model.rules)) {
    return model.rules
  }
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
  const rules = getRules(word, model);
  for (let i = 0; i < rules.length; i += 1) {
    let suffix = rules[i][0];
    if (word.endsWith(suffix)) {
      let reg = new RegExp(suffix + '$');
      return word.replace(reg, rules[i][1])
    }
  }
  return null
};

const getSuffixes = function (str = '') {
  let list = [];
  for (let i = 4; i >= 0; i -= 1) {
    if (str.length - 1 <= i) {
      continue
    }
    let suffix = str.substr(str.length - i - 1, str.length - 1);
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
        let reg = new RegExp(obj.from + '$');
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
  scored = scored.filter((o) => {
    return o.yes > 1 && o.yes > o.no
  });
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

const squeeze = function (arr) {
  let redundant = {};
  // remove any redundant downstream
  arr.forEach((o, i) => {
    let downstream = arr.slice(i + 1, arr.length);
    downstream.forEach((d) => {
      if (d.from.endsWith(o.from)) {
        redundant[d.from] = true;
      }
    });
  });
  // actually remove any redundant suffixes
  arr = arr.filter((o) => {
    return redundant.hasOwnProperty(o.from) === false
  });
  return arr
};

function reverse(str) {
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
    a = reverse(a.from);
    b = reverse(b.from);
    if (a > b) {
      return 1
    } else if (a < b) {
      return -1
    }
    return 0
  });
  return rules.map((o) => [o.from, o.to, o.yes])
};

const format = function (rules, pairs) {
  let exceptions = {};
  rules.forEach((rule) => {
    Object.assign(exceptions, rule.exceptions);
  });
  // find remaining pairs with no rule
  let untouched = pairs.filter((pair) => {
    if (exceptions.hasOwnProperty(pair[0])) {
      return false
    }
    // console.log(rules.find((rule) => pair[0].endsWith(rule.from)))
    if (rules.find((rule) => pair[0].endsWith(rule.from))) {
      return false
    }
    return true
  });
  let coverage = pairs.length - untouched.length;
  let percent = coverage / pairs.length;
  return {
    rules: fmtRules(rules),
    exceptions: exceptions,
    coverage: percent,
    remaining: untouched,
  }
};

const pressRules = function (rules) {
  let byChar = {};
  rules.forEach((a) => {
    let suff = a[0] || '';
    let char = suff[suff.length - 1] || '';
    byChar[char] = byChar[char] || [];
    byChar[char].push(a);
  });
  return byChar
};

const overlap = (from, to) => {
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

const pressObj = function (obj) {
  let res = {};
  Object.keys(obj).forEach((k) => {
    let val = obj[k];
    let prefix = overlap(k, val);
    if (prefix.length < 2) {
      res[k] = val;
      return
    }
    let out = '.' + prefix.length + val.substr(prefix.length);
    res[k] = out;
  });
  return res
};

const compress = function (model) {
  model.rules = pressRules(model.rules);
  model.exceptions = pressObj(model.exceptions);
  return model
};

const find = function (pairs) {
  pairs = pairs.filter((a) => a && a[0] && a[1]);
  // look at all patterns
  const suffixes = getAll(pairs);
  // look for the greatest patterns
  let best = findBest(suffixes);
  // run pattern against the pairs
  let rules = rank(best, pairs);
  // remove duplicates
  rules = squeeze(rules);
  // nice result format
  return format(rules, pairs)
};

const percent = (part, total) => {
  let num = part / total;
  num = Math.round(num * 1000) / 1000;
  return num
};

const postProcess = function (res, inputSize) {
  let count = 0;
  res.rules = res.rules.map((a) => {
    count += a[2];
    return a.slice(0, 2)
  });
  // convert exceptions to an object
  res.exceptions = res.exceptions.reduce((h, a) => {
    h[a[0]] = a[1];
    return h
  }, {});
  // sort rules results
  res.rules = res.rules.sort((a, b) => {
    if (a[0].length > b[0].length) {
      return -1
    } else if (a[0].length < b[0].length) {
      return 1
    }
    return 0
  });
  res.coverage = percent(count, inputSize);
  return res
};

const wrapper = function (pairs) {
  let inputSize = pairs.length;
  let res = {};
  let found = find(pairs);
  res.rules = found.rules || [];
  res.exceptions = found.remaining.concat(Object.entries(found.exceptions));
  res = postProcess(res, inputSize);
  res = compress(res);
  return res
};

export { compress, convert, wrapper as find };
