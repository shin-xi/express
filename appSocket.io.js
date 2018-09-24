const express = require('express');
const app = express();
const compression = require('compression');

const server = app.listen(3000, 'localhost', () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('listening at http://%s:%s', host, port);
});

const io = require('socket.io')(server);

app.use(compression());
app.use(express.static('public'));

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/public/chat/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg, id) => {
        // console.log(id);
        io.emit('chat message', msg, id);
    });
});
