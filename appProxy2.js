const express = require('express')
const proxy = require('http-proxy-middleware')
const app = express()

app.use('/api', proxy({
  target: 'http://119.29.163.132.48403',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}))

app.use(express.static('dist'))

app.get('*', (req, res) => {
  res.sendfile('./dist/index.html')
})

app.listen(80, () => console.log('连接成功'))
