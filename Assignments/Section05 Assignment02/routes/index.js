const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const rootdir = require('../util/path');

const router = express.Router();

router.get('/users', (req, res, next) => {
    res.sendFile(path.join(rootdir, 'views', 'index.html'));
});

module.exports = router;
