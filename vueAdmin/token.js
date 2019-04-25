// 1.获取token
// 2.根据token拉取用户信息

const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended: false})

const payload = {name: 'shino', exp: new Date(2018, 9, 1, 0, 0, 0).getTime()}
const secret = 'myAdmin'

// HS256 secrets are typically 128-bit random strings, for example hex-encoded:
// const secret = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex)

// encode
// const token = jwt.encode(payload, secret)

// decode
// const decoded = jwt.decode(token, secret)

router.post('/login', urlencodedParser, (req, res) => { // 登陆后返回token
    const {name, password} = req.body // 获取接口的 用户名和密码
    // 假定判断登陆成功

    const oriData = {
        name,
        date: Date.now()
    }

    const userToken = jwt.encode(oriData, secret)
    console.log(oriData)

    res.json({
        token: userToken
    })
})

module.exports = router
