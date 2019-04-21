const express = require('express')
const router = express.Router()

// 文件下载
router.get('/slide1', (req, res) => {
  res.download('./public/images/slide1.jpeg')
})

module.exports = router
