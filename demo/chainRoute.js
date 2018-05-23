const express = require('express');
const router = express.Router();

// 链式路由
function common(req, res) {
    console.log('common');
}

// 挂载至 /book 的中间件，任何指向 /book 的请求都会执行它
router.use('/book', function (req, res, next) {
    console.log('Request Type:', req.method);
    res.setHeader("x-powered-by", ' 3.2.1');
    next();
});

router.route('/book')
    .get((req, res) => {
        common();
        res.send('Get a random book');
    })
    .post((req, res) => {
        common();
        res.send('Add a book');
    })
    .put((req, res) => {
        common();
        res.send('Update the book');
    });

module.exports = router;