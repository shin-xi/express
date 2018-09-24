const express = require('express');
const router = express.Router();

router.get('/xxx', (req, res) => {
    res.redirect('http://localhost:3000/redirect');
});

// 永久重定向
router.get('/redirect', (req, res) => {
    res.redirect(301, '/');
});

module.exports = router;