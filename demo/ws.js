const express = require('express');
const router = express.Router();
const expressWs = require('express-ws')(app);

router.ws('/echo', (ws, req) => {
    ws.on('message', (msg) => {
        ws.send(msg);
    });
});

module.exports = router;