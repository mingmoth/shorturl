const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const validUrl = require('valid-url')
const short = require('../../models/short')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const input = req.body.url

  if (!validUrl.isUri(input)) {
    const invalid = "inValid URL"
    res.render('index', { invalid })
  } else {
    Url.findOne({ origin: input }).lean()
      .then((url) => {
        if (url) {
          const shorturl = url.short
          res.render('index', { shorturl })
        } else {
          const shorturl = req.headers.host + '/' + short()
          Url.create({ origin: input, short: shorturl })
            .then(res.render('index', { shorturl }))
        }
      })
      .catch(err => console.log(err))
  }
})

router.get('/:shortUrl', (req, res) => {
  const shortUrl = req.headers.host + '/' + req.params.shortUrl
  Url.findOne({ short: shortUrl }).lean()
    .then((url) => {
      return res.redirect(url.origin)
    })
    .catch(err => console.log(err))
})

module.exports = router