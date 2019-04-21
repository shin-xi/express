const express = require('express')
const app = express()
const expressWs = require('express-ws')(app)

app.use((req, res, next) => {
  console.log('middleware')
  req.testing = 'testing'
  return next()
})

app.get('/', (req, res, next) => {
  console.log('get route', req.testing)
  res.end()
})

let myMsg
app.ws('/', (ws, req) => {
  ws.on('message', (msg) => {
    console.log(msg)
    let myMsg = JSON.parse(msg)
    ws.send(JSON.stringify(myMsg))
  })

  setInterval(() => {
    ws.send(JSON.stringify(myMsg))
  }, 1000)
  // console.log('socket', req.testing);
})

app.listen(3000)
