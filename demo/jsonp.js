const express = require('express')
const router = express.Router()

router.get('/jsonp', (req, res) => {
  // res.jsonp(null); // => null

  // res.jsonp({ user: 'tobi' }); // => { "user": "tobi" }

  res.jsonp({ user: 'tobi' }) // ?callback=foo
})

module.exports = router
