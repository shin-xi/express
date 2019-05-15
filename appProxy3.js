const express = require('express')
const app = express()
const axios = require('axios')

app.get(/.*/, (req, res) => {
  console.log(req.headers)
  console.log(req.protocol)
  axios({
    method: 'get',
    url: 'http://jsonplaceholder.typicode.com/posts'
  }).then(res => {
    console.log(res.data)
  })

  res.end('success')
})

// 监听端口
const server = app.listen(8888, 'localhost', () => {
  const host = server.address().address
  const port = server.address().port

  console.log(`listening at http://${host}:${port}`)
})
