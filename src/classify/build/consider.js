const getPercent = (part, total) => {
  if (total === 0) {
    return 100
  }
  let num = (part / total) * 100;
  num = Math.round(num * 10) / 10;
  return num;
};

// decide whether this rule performs well or not
const considerRule = function (end, tag, pairs) {
  if (!end || !tag) {
    return { percent: 0 }
  }
  let total = 0
  let clear = new Set()
  pairs.forEach(pair => {
    if (pair[0].endsWith(end)) {
      total += 1
      if (tag === pair[1]) {
        clear.add(pair[0])
      }
    }
  })
  return {
    end, tag,
    total,
    count: clear.size,
    percent: getPercent(clear.size, total),
    clear
  }
}
export default considerRule