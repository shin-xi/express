const express = require('express');
const router = express.Router();

// 匹配 acd 和 abcd
router.get('/ab?cd', (req, res) => {
    res.send('ab?cd');
});

// 匹配 abcd、abbcd、abbbcd等
router.get('/ab+cd', (req, res) => {
    res.send('ab+cd');
});

// 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
router.get('/ab*cd', (req, res) => {
    res.send('ab*cd');
});

// 匹配 /abe 和 /abcde
router.get('/ab(cd)?e', (req, res) => {
    res.send('ab(cd)?e');
});

// 匹配任何路径中含有 a 的路径：
// router.get(/a/, (req, res) => {
//     res.send('/a/');
// });

// 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
router.get(/.*fly$/, (req, res) => {
    res.send('/.*fly$/');
});

module.exports = router;