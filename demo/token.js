const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended: false})

const payload = {name: 'shino', exp: new Date(2018, 9, 1, 0, 0, 0).getTime()}
const secret = 'noSecret'

// HS256 secrets are typically 128-bit random strings, for example hex-encoded:
// const secret = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex)

// encode
const token = jwt.encode(payload, secret)

// decode
const decoded = jwt.decode(token, secret)
// console.log(token);
// console.log(decoded); //=> { foo: 'bar' }

const userInfo = { // 登陆信息
    name: 'shino',
    password: 'helpme'
}

router.post('/getToken', urlencodedParser, (req, res) => {
    // res.json(token)
    const {name, password} = req.body // 获取接口的 用户名和密码
    // 假定登陆成功
    const userToken = jwt.encode({
        name, password
    }, secret)

    res.json({
        token: userToken
    })
})

// "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoic2hpbm8iLCJwYXNzd29yZCI6ImhlbHBtZSJ9.PdmkAb9qhoLIxOuiF7waB2Stt4IUzUSjx69eB-kHUMo"

router.post('/getUserInfo', urlencodedParser, (req, res) => {
    // res.json(token)
    const {token} = req.body // 获取接口的 用户名和密码
    // 假定登陆成功
    const userInfo = jwt.decode(token, secret)

    res.json({
        ...userInfo,
        role: 'admin'
    })
})

module.exports = router
