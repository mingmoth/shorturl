const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb://localhost/shorturl'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('once', () => [
  console.log('mongodb connected')
])

module.exports = db