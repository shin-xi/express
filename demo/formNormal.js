const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// // Express/Connect top-level generic
// // parse application/x-www-form-urlencoded
// router.use(bodyParser.urlencoded({ extended: false }));
//
// // parse application/json
// router.use(bodyParser.json());
//
// router.post('/myBody', (req, res) => {
//     res.json(req.body);
// });

// ---------------------------------------------------- //

// Express route-specific
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// create application/json parser
const jsonParser = bodyParser.json();

// POST /login gets urlencoded bodies
router.post('/urlencodedParser', urlencodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    res.json(req.body);
});

// POST /api/users gets JSON bodies
router.post('/jsonParser', jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    res.json(req.body);
});

// ---------------------------------------------------- //

// // Change accepted type for parsers
// parse various different custom JSON types as JSON
// router.use(bodyParser.json({ type: 'application/*+json' }));

// parse some custom thing into a Buffer
// router.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
// router.use(bodyParser.raw({ type: 'application/json' }));
// router.use(bodyParser.raw({ type: 'text/plain' }));
//
// // parse an HTML body into a string
// router.use(bodyParser.text({ type: 'text/html' }));
//
// router.post('/myBody', (req, res) => {
//     res.json(req.body);
// });

// ---------------------------------------------------- //


module.exports = router;