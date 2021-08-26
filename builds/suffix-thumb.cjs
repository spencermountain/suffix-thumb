/* suffix-thumb 2.0.0 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.suffixThumb = {}));
}(this, (function (exports) { 'use strict';

  var prefix = /^.([0-9]+)/;

  var isArray = function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  }; // handle compressed form of key-value pair


  var getKeyVal = function getKeyVal(word, model) {
    var val = model.exceptions[word];
    var m = val.match(prefix);

    if (m === null) {
      // return not compressed form
      return model.exceptions[word];
    } // uncompress it


    var num = Number(m[1]) || 0;
    var pre = word.substr(0, num);
    return pre + val.replace(prefix, '');
  }; // get suffix-rules according to last char of word


  var getRules = function getRules(word, model) {
    // support old uncompressed format
    if (isArray(model.rules)) {
      return model.rules;
    }

    var _char = word[word.length - 1];
    var rules = model.rules[_char] || [];

    if (rules.length === 0) {
      // do we have a generic suffix?
      rules = model.rules[''] || rules;
    }

    return rules;
  };

  var convert = function convert(word, model) {
    // check list of irregulars
    if (model.exceptions.hasOwnProperty(word)) {
      return getKeyVal(word, model);
    } // try suffix rules


    var rules = getRules(word, model);

    for (var i = 0; i < rules.length; i += 1) {
      var suffix = rules[i][0];

      if (word.endsWith(suffix)) {
        var reg = new RegExp(suffix + '$');
        return word.replace(reg, rules[i][1]);
      }
    }

    return null;
  };

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
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
    if (n === "Map" || n === "Set") return Array.from(o);
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

  var getSuffixes = function getSuffixes() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var list = [];

    for (var i = 4; i >= 0; i -= 1) {
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
      fromList.push(''); //add a prepend-only option

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

  var squeeze = function squeeze(arr) {
    var redundant = {}; // remove any redundant downstream

    arr.forEach(function (o, i) {
      var downstream = arr.slice(i + 1, arr.length);
      downstream.forEach(function (d) {
        if (d.from.endsWith(o.from)) {
          redundant[d.from] = true;
        }
      });
    }); // actually remove any redundant suffixes

    arr = arr.filter(function (o) {
      return redundant.hasOwnProperty(o.from) === false;
    });
    return arr;
  };

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
    var percent = coverage / pairs.length;
    return {
      rules: fmtRules(rules),
      exceptions: exceptions,
      coverage: percent,
      remaining: untouched
    };
  };

  var pressRules = function pressRules(rules) {
    var byChar = {};
    rules.forEach(function (a) {
      var suff = a[0] || '';

      var _char = suff[suff.length - 1] || '';

      byChar[_char] = byChar[_char] || [];

      byChar[_char].push(a);
    });
    return byChar;
  };

  var overlap = function overlap(from, to) {
    var all = [];

    for (var i = 0; i < from.length; i += 1) {
      if (from[i] === to[i]) {
        all.push(from[i]);
      } else {
        break;
      }
    }

    return all.join('');
  };

  var pressObj = function pressObj(obj) {
    var res = {};
    Object.keys(obj).forEach(function (k) {
      var val = obj[k];
      var prefix = overlap(k, val);

      if (prefix.length < 2) {
        res[k] = val;
        return;
      }

      var out = '.' + prefix.length + val.substr(prefix.length);
      res[k] = out;
    });
    return res;
  };

  var compress = function compress(model) {
    model.rules = pressRules(model.rules);
    model.exceptions = pressObj(model.exceptions);
    return model;
  };

  var find = function find(pairs) {
    pairs = pairs.filter(function (a) {
      return a && a[0] && a[1];
    }); // look at all patterns

    var suffixes = getAll(pairs); // look for the greatest patterns

    var best = findBest(suffixes); // run pattern against the pairs

    var rules = rank(best, pairs); // remove duplicates

    rules = squeeze(rules); // nice result format

    return format(rules, pairs);
  };

  var percent = function percent(part, total) {
    var num = part / total;
    num = Math.round(num * 1000) / 1000;
    return num;
  };

  var postProcess = function postProcess(res, inputSize) {
    var count = 0;
    res.rules = res.rules.map(function (a) {
      count += a[2];
      return a.slice(0, 2);
    }); // convert exceptions to an object

    res.exceptions = res.exceptions.reduce(function (h, a) {
      h[a[0]] = a[1];
      return h;
    }, {}); // sort rules results

    res.rules = res.rules.sort(function (a, b) {
      if (a[0].length > b[0].length) {
        return -1;
      } else if (a[0].length < b[0].length) {
        return 1;
      }

      return 0;
    });
    res.coverage = percent(count, inputSize);
    return res;
  };

  var wrapper = function wrapper(pairs) {
    var inputSize = pairs.length;
    var res = {};
    var found = find(pairs);
    res.rules = found.rules || [];
    res.exceptions = found.remaining.concat(Object.entries(found.exceptions));
    res = postProcess(res, inputSize);
    res = compress(res);
    return res;
  };

  exports.compress = compress;
  exports.convert = convert;
  exports.find = wrapper;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
