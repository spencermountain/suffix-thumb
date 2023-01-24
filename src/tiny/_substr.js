// https://github.com/dinhoabreu/node-lcs/blob/master/index.js
function longestCommonSubstring(str1, str2) {
  if (!str1 || !str2) {
    return {
      len: 0,
      sequence: '',
      offset: 0
    }
  }

  let sequence = ''
  let str1Length = str1.length
  let str2Length = str2.length
  let num = new Array(str1Length)
  let maxlen = 0
  let lastSubsBegin = 0

  for (let i = 0; i < str1Length; i++) {
    let subArray = new Array(str2Length)
    for (let j = 0; j < str2Length; j++) { subArray[j] = 0 }
    num[i] = subArray
  }
  let thisSubsBegin = null
  for (let i = 0; i < str1Length; i++) {
    for (let j = 0; j < str2Length; j++) {
      if (str1[i] !== str2[j]) { num[i][j] = 0 } else {
        if ((i === 0) || (j === 0)) { num[i][j] = 1 } else { num[i][j] = 1 + num[i - 1][j - 1] }

        if (num[i][j] > maxlen) {
          maxlen = num[i][j]
          thisSubsBegin = i - num[i][j] + 1
          if (lastSubsBegin === thisSubsBegin) { // if the current LCS is the same as the last time this block ran
            sequence += str1[i]
          } else { // this block resets the string builder if a different LCS is found
            lastSubsBegin = thisSubsBegin
            sequence = '' // clear it
            sequence += str1.substr(lastSubsBegin, (i + 1) - lastSubsBegin)
          }
        }
      }
    }
  }
  return {
    len: maxlen,
    sequence: sequence,
    offset: thisSubsBegin
  }
}

export default longestCommonSubstring