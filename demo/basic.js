const express = require('express');
const router = express.Router();

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
    // console.log('路由级中间件');
    // console.log('Time:', Date.now());
    next();
});

router.get('/', (req, res) => {
    res.send('Hello world!')
});

// 永久重定向
router.get('/redirect', (req, res) => {
    res.redirect(301, '/');
});

module.exports = router;