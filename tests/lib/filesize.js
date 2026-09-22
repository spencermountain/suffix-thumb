
// approximate file-size of given text
const fileSize = (txt) => {
  if (!txt) {
    return '0kb'
  }
  if (typeof txt === 'object') {
    txt = JSON.stringify(txt)
  }
  let num = Buffer.byteLength(txt, 'utf8')
  num = num / 1000
  num = Math.round(num * 10) / 10//round it
  return num.toLocaleString() //+ unit
}

export default fileSize