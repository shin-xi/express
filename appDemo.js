const express = require('express');
const app = express();
const basic = require('./demo/basic');
const callback = require('./demo/callback');
const chainRoute = require('./demo/chainRoute');
const download = require('./demo/download');
const formNormal = require('./demo/formNormal');
const formData = require('./demo/formData');
const db = require('./demo/db');
const mockApi = require('./demo/mockApi');


// 去除回包头 X-Powered-By: Express
app.disable('x-powered-by');

// 静态文件目录
const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders(res, path, stat) {
        res.set('x-timestamp', Date.now());
    }
};
app.use(express.static('public', options));

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use((req, res, next) => {
    // console.log('应用级中间件');
    console.log('Time:', Date.now());
    next();
});

// 外部模块
app.use('/', [basic, callback, chainRoute, download, formNormal, formData, db, mockApi]);

// 错误处理中间件
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const server = app.listen(3000, 'localhost', () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('listening at http://%s:%s', host, port);
});