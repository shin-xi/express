const express = require('express');
const router = express.Router();
const session = require('express-session');

// Use the session middleware
router.use(session({
    //name: 'hhw', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    secret: 'keyboard cat',
    resave: true, // 重新保存：强制会话保存即使是未修改的。默认为true但是得写上
    saveUninitialized: true, // 强制“未初始化”的会话保存到存储。
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: 60000 },
}));

router.get('/session', (req, res) => {
    console.log(req.session);
    if (req.session.views) {
        req.session.views++;
        res.setHeader('Content-Type', 'text/html');
        res.write('<p>views: ' + req.session.views + '</p>');
        res.write('<p>id: ' + req.session.id + '</p>');
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
        res.end()
    } else {
        req.session.views = 1;
        res.end('welcome to the session demo. refresh!')
    }
});

module.exports = router;