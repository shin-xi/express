const express = require('express')
const app = express()

// 去除回包头 X-Powered-By: Express
app.disable('x-powered-by')

// 跨域方式二
app.use('/', require('cors')())

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
