const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// POST /login gets urlencoded bodies
router.post('/urlencodedParser', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    res.json(req.body);
});

// POST /api/users gets JSON bodies
router.post('/jsonParser', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    res.json(req.body);
});

module.exports = router;