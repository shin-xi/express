const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')

const payload = { name: 'shino', exp: new Date(2018, 9, 1, 0, 0, 0).getTime() }
const secret = 'noSecret'

// HS256 secrets are typically 128-bit random strings, for example hex-encoded:
// const secret = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex)

// encode
const token = jwt.encode(payload, secret)

// decode
const decoded = jwt.decode(token, secret)
// console.log(token);
// console.log(decoded); //=> { foo: 'bar' }

router.get('/token', (req, res) => {
  res.json(token)
})

module.exports = router
