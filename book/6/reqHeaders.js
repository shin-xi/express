const express = require('express')
const router = express.Router()

router.get('/headers', (req, res) => {
  console.log(req.headers)
  res.json(req.headers)
})

module.exports = router
