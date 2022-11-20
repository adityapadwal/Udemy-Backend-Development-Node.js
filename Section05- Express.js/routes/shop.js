// Importing express.js
const express = require('express');

const rootDir = require('../util/path');

// Importing the path core module
const path = require('path');

// Creating an express.js router
const router = express.Router();

router.get('/',(req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
}); 
// In the above code __dirname points to routes folder

module.exports = router;

