const express = require('express');
const app = express();
const basic = require('./demo/basic');
const redirect = require('./demo/redirect');
const pattern = require('./demo/pattern');
const callback = require('./demo/callback');
const jsonp = require('./demo/jsonp');
const chainRoute = require('./demo/chainRoute');
const sendFile = require('./demo/sendFile');
const download = require('./demo/download');
const formNormal = require('./demo/formNormal');
const formData = require('./demo/formData');
// const mongoDB = require('./demo/mongoDB');
const compression = require('compression');
const mockApi = require('./demo/mockApi');
const token = require('./demo/token');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// 跨域设置 https://www.npmjs.com/package/cors
app.use(cors());

// 尽量在其他中间件前使用compression (GZIP)
app.use(compression());

// 加载用于解析 cookie 的中间件
app.use(cookieParser());

// 去除回包头 X-Powered-By: Express
app.disable('x-powered-by');

// 静态文件目录
// const options = {
//     dotfiles: 'ignore',
//     etag: false,
//     extensions: false,
//     maxAge: '1d',
//     redirect: false,
//     setHeaders(res, path, stat) {
//         res.set('x-timestamp', Date.now());
//     }
// };

app.use(express.static('public'));
// app.use(express.static('public', options));

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
// console.log('应用级中间件');
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});

// 外部模块
app.use('/', [basic, redirect, pattern, callback, jsonp, chainRoute, sendFile, download, formNormal, formData, mockApi, token]);

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const server = app.listen(3000, 'localhost', () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`listening at http://${host}:${port}`);
});