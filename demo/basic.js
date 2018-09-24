const express = require('express');
const router = express.Router();
const axios = require('axios');

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use((req, res, next) => {
    // console.log('路由级中间件');
    // console.log('Time:', Date.now());
    next();
});

router.get('/', (req, res) => {
    res.send('Hello world!');
});


router.get('/cookies', (req, res) => {
    res.jsonp(req.cookies);
});

router.get('/status', (req, res) => {
    // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    res.sendStatus(201);
});

router.post('/', (req, res) => {
    res.send('Hello world!')
});

router.get('/api/test', (req, res) => { // 反向代理 + 代发请求
    axios.get('http://jsonplaceholder.typicode.com/posts/1')
        .then((response) => {
            console.log(response.data);
            res.json(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = router;