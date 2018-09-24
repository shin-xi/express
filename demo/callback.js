const express = require('express');
const router = express.Router();

// 内部回调函数
router.get('/example/next1', (req, res, next) => {
    console.log('response will be sent by the next function ...');
    next();
}, (req, res, next) => {
    next();
}, (req, res) => {
    res.send('Hello from C!');
});

// 外部回调函数
const cb0 = (req, res, next) => {
    console.log('CB0');
    next();
};

const cb1 = (req, res, next) => {
    console.log('CB1');
    next();
};

const cb2 = (req, res, next) => {
    res.send('Hello from C!');
};

router.get('/example/next2', [cb0, cb1], [cb2]);

module.exports = router;