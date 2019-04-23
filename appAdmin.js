const express = require('express')
const app = express()
const demo = require('./vueAdmin/demo')
const token = require('./vueAdmin/token')

// 去除回包头 X-Powered-By: Express
app.disable('x-powered-by')

// 跨域方式二
app.use('/', require('cors')())

// 外部模块
app.use('/', [demo, token])

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const server = app.listen(3000, '192.168.31.16', () => {
  const host = server.address().address
  const port = server.address().port

  console.log('listening at http://%s:%s', host, port)
})
