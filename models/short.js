function pick(target) {
  const index = Math.floor(Math.random() * target.length)
  return target[index]
}

function short() {
  const lower = 'abcdefghijklmnopqrstuvwxyz'
  const Upper = lower.toUpperCase()
  const num = '0123456789'
  const symbol = '`~!@$%^&*()-_+={}[]|;:"<>,.?/'
  const collection = lower + Upper + num + symbol
  let shorturl = ''

  for(let i = 0; i < 5; i++) {
    shorturl = shorturl.concat(pick(collection))
  }

  return shorturl
}



module.exports = short