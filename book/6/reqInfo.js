const express = require('express');
const router = express.Router();

router.get('/reqInfo', (req, res) => {
    res.json({
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        headers: req.headers,
        ip: req.ip,
        path: req.path,
        hostname: req.hostname,
        xhr: req.xhr,
        secure: req.secure,
        url: req.url,
        originalUrl: req.originalUrl
    });
});

module.exports = router;