const express = require('express');
const router = express.Router();

router.get('/file/:name', (req, res, next) => {

    const options = {
        root: __dirname + '/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    const fileName = req.params.name;
    res.sendFile(fileName, options, (err) => {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
            console.log('Sent:', fileName);
        }
    });

});

module.exports = router;