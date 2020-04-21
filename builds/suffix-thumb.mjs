/* suffix-thumb 0.0.1 MIT */
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var getSuffixes = function getSuffixes(str) {
  var list = [];

  for (var i = 4; i > 0; i -= 1) {
    if (str.length - 1 <= i) {
      continue;
    }

    var suffix = str.substr(str.length - i - 1, str.length - 1);
    list.push(suffix);
  }

  return list;
};

var getAll = function getAll(arr) {
  var suffixes = {};
  arr.forEach(function (a) {
    var _a = _slicedToArray(a, 2),
        from = _a[0],
        to = _a[1];

    var fromList = getSuffixes(from);
    fromList.forEach(function (left) {
      suffixes[left] = suffixes[left] || {};
      var toList = getSuffixes(to);
      toList.forEach(function (right) {
        suffixes[left][right] = suffixes[left][right] || 0;
        suffixes[left][right] += 1;
      });
    });
  });
  return suffixes;
};

var _01GetAll = getAll;

var topChange = function topChange(obj, from) {
  var keys = Object.keys(obj);
  var arr = keys.map(function (to) {
    return {
      from: from,
      to: to,
      yes: obj[to]
    };
  });
  arr = arr.sort(function (a, b) {
    if (a.yes > b.yes) {
      return -1;
    } else if (a.yes < b.yes) {
      return 1;
    }

    return 0;
  });
  return arr;
};

var findBest = function findBest(suffixes) {
  var good = [];
  Object.keys(suffixes).forEach(function (left) {
    var top = topChange(suffixes[left], left);

    if (top[0] && top[0].yes > 1) {
      good.push(top[0]);
    }
  });
  good = good.sort(function (a, b) {
    if (a.yes > b.yes) {
      return -1;
    } else if (a.yes < b.yes) {
      return 1;
    }

    return 0;
  });
  return good;
};

var _02FindBest = findBest;

var getScores = function getScores(arr, pairs) {
  return arr.map(function (obj) {
    var yes = 0;
    var no = 0;
    var exceptions = {};
    pairs.forEach(function (pair) {
      if (pair[0].endsWith(obj.from)) {
        var reg = new RegExp(obj.from + '$');
        var have = pair[0].replace(reg, obj.to);

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
      exceptions: exceptions
    };
  });
};

var rank = function rank(arr, pairs) {
  var scored = getScores(arr, pairs);
  scored = scored.filter(function (o) {
    return o.yes > 1 && o.yes > o.no;
  });
  scored = scored.sort(function (a, b) {
    if (a.yes > b.yes) {
      return -1;
    } else if (a.yes < b.yes) {
      return 1;
    }

    return 0;
  });
  return scored;
};

var _03Rank = rank;

var compress = function compress(arr) {
  var redundant = {}; // remove any redundant downstream

  arr.forEach(function (o, i) {
    var downstream = arr.slice(i + 1, arr.length);
    downstream.forEach(function (d) {
      if (d.from.endsWith(o.from)) {
        // console.log(o.from + '  #' + i + '  ->    #' + k + ' ' + d.from)
        redundant[d.from] = true;
      }
    });
  }); // actually remove any redundant suffixes

  arr = arr.filter(function (o) {
    return redundant.hasOwnProperty(o.from) === false;
  });
  return arr;
};

var _04Compress = compress;

function reverse(str) {
  return str.split('').reverse().join('');
}

var fmtRules = function fmtRules(rules) {
  // sort by length, then by suffix
  rules = rules.sort(function (a, b) {
    if (a.from.length > b.from.length) {
      return -1;
    } else if (a.from.length < b.from.length) {
      return 1;
    }

    a = reverse(a.from);
    b = reverse(b.from);

    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }

    return 0;
  });
  return rules.map(function (o) {
    return [o.from, o.to, o.yes];
  });
};

var format = function format(rules, pairs) {
  var exceptions = {};
  rules.forEach(function (rule) {
    Object.assign(exceptions, rule.exceptions);
  }); // find remaining pairs with no rule

  var untouched = pairs.filter(function (pair) {
    if (exceptions.hasOwnProperty(pair[0])) {
      return false;
    } // console.log(rules.find((rule) => pair[0].endsWith(rule.from)))


    if (rules.find(function (rule) {
      return pair[0].endsWith(rule.from);
    })) {
      return false;
    }

    return true;
  });
  var coverage = pairs.length - untouched.length;
  var percent = coverage / pairs.length * 100;
  return {
    rules: fmtRules(rules),
    exceptions: exceptions,
    percent: percent // coverage: coverage,
    // remaining: untouched,

  };
};

var _05Format = format;

var thumb = function thumb(pairs) {
  // look at all patterns
  var suffixes = _01GetAll(pairs); // look for the greatest patterns

  var best = _02FindBest(suffixes); // run pattern against the pairs

  var rules = _03Rank(best, pairs); // remove duplicates

  rules = _04Compress(rules); // nice result format

  return _05Format(rules, pairs);
};

var src = thumb;

export default src;
