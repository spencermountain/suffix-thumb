
function toRegExp(str) {
  str = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
  return new RegExp(str + '$')
}

const percent = (part, total) => {
  let num = (part / total) * 100;
  num = Math.round(num * 10) / 10;
  return num;
};

const getScore = function (sub, pairs) {
  let { left, right } = sub
  let done = []
  let nos = []
  pairs.forEach(a => {
    if (a[0].endsWith(left)) {
      let reg = toRegExp(left)
      let out = a[0].replace(reg, right)
      if (out === a[1]) {
        done.push(a[0])
      } else {
        nos.push(a[0])
      }
    }
  })
  return { done, nos: nos.length, percent: percent(done.length, pairs.length) }
}

export default getScore