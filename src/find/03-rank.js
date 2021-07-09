const getScores = function (arr, pairs) {
  return arr.map((obj) => {
    let yes = 0
    let no = 0
    let exceptions = {}
    pairs.forEach((pair) => {
      if (pair[0].endsWith(obj.from)) {
        let reg = new RegExp(obj.from + '$')
        let have = pair[0].replace(reg, obj.to)
        if (have === pair[1]) {
          yes += 1
        } else {
          no += 1
          exceptions[pair[0]] = pair[1]
        }
      }
    })
    return {
      from: obj.from,
      to: obj.to,
      yes: yes,
      no: no,
      percent: yes / (yes + no),
      exceptions: exceptions,
    }
  })
}

const rank = function (arr, pairs) {
  let scored = getScores(arr, pairs)
  scored = scored.filter((o) => {
    return o.yes > 1 && o.yes > o.no
  })
  scored = scored.sort((a, b) => {
    if (a.yes > b.yes) {
      return -1
    } else if (a.yes < b.yes) {
      return 1
    }
    return 0
  })
  return scored
}
module.exports = rank
