const express = require('express');
const router = express.Router();
const mockData = require('./mockData/dataDemo');

// 挂载至 /book 的中间件，任何指向 /book 的请求都会执行它
router.use('/mock', function (req, res, next) {
    console.log('Request Type:', req.method);
    res.setHeader("x-powered-by", 'mock');
    next();
});

router.route('/mock')
    .get((req, res) => {
        res.json(mockData.data);
    })
    .post((req, res) => {
        res.json(mockData.data);
    });

module.exports = router;