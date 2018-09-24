const express = require('express');
const router = express.Router();
const mockData = require('./mockData/dataDemo');

// 挂载至 /book 的中间件，任何指向 /book 的请求都会执行它
router.use('/mock', (req, res, next) => {
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

router.route('/rulesList')
    .get((req, res) => {
        console.log(req.query);
        let page, pageSize;
        ({ page, pageSize } = req.query);


        let items = rulesList.data.items;
        console.log(JSON.stringify(items));
        res.json({
            code: 200,
            data: {
                items: items.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize),
                _meta: {
                    page,
                    pageSize,
                    count: items.length
                }
            }
        });
    });

router.route('/rules')
    .get((req, res) => {
        res.json({
            code: 200,
            data: 1
        });
    });

module.exports = router;