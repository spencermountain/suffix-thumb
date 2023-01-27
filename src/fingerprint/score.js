//sweep-through all suffixes
const suffixLoop = function (str = '', suffixes = []) {
  const len = str.length
  let max = 7
  if (len <= max) {
    max = len - 1
  }
  for (let i = max; i >= 1; i -= 1) {
    let suffix = str.substring(len - i, len)
    if (suffixes[suffix.length] && suffixes[suffix.length].hasOwnProperty(suffix) === true) {
      let tag = suffixes[suffix.length][suffix]

      return tag
    }
  }
  return null
}
const percent = (part, total) => {
  let num = (part / total) * 100;
  num = Math.round(num * 10) / 10;
  return num;
};

const score = function (listA, listB, rules, labelA, labelB) {
  let right = 0
  let wrong = 0
  let none = 0
  let wrongA = []
  let wrongB = []
  listA.forEach(str => {
    let res = suffixLoop(str, rules)
    if (res === labelA) {
      right += 1
    } else if (res === labelB) {
      wrongA.push(str)
      wrong += 1
    } else {
      none += 1
    }
  })
  listB.forEach(str => {
    let res = suffixLoop(str, rules)
    if (res === labelB) {
      right += 1
    } else if (res === labelA) {
      wrongB.push(str)
      wrong += 1
    } else {
      none += 1
    }
  })
  let total = right + wrong + none
  console.log(right, `right  ${percent(right, total)}%`)
  console.log(wrong, `wrong ${percent(wrong, total)}%`)
  console.log(none, `null ${percent(none, total)}%`)
  return { wrongA, wrongB }
}
export default score