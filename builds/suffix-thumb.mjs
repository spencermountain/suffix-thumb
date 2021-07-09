/* suffix-thumb 0.2.0 MIT */
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

var _01GetAll = getAll;

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

const findBest$1 = function (suffixes) {
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

var _02FindBest = findBest$1;

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

const rank$1 = function (arr, pairs) {
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
var _03Rank = rank$1;

const compress$1 = function (arr) {
  let redundant = {};
  // remove any redundant downstream
  arr.forEach((o, i) => {
    let downstream = arr.slice(i + 1, arr.length);
    downstream.forEach((d) => {
      if (d.from.endsWith(o.from)) {
        // console.log(o.from + '  #' + i + '  ->    #' + k + ' ' + d.from)
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
var _04Compress = compress$1;

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

const format$1 = function (rules, pairs) {
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
var _05Format = format$1;

const produce = _01GetAll;
const findBest = _02FindBest;
const rank = _03Rank;
const compress = _04Compress;
const format = _05Format;

const thumb = function (pairs) {
  // look at all patterns
  const suffixes = produce(pairs);
  // look for the greatest patterns
  let best = findBest(suffixes);
  // run pattern against the pairs
  let rules = rank(best, pairs);
  // remove duplicates
  rules = compress(rules);
  // nice result format
  return format(rules, pairs)
};
var src = thumb;

export default src;
