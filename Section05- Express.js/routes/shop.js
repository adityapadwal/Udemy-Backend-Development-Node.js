// Importing express.js
const express = require('express');

const rootDir = require('../util/path');  // to work on all operating systems  

// Importing the path core module
const path = require('path');

// Creating an express.js router
const router = express.Router();

router.get('/',(req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
}); 
// In the above code __dirname points to routes folder

module.exports = router;

