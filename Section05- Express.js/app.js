// Import express 
const express = require('express');
// Importing the path core module
const path = require('path'); // to work on all operating systems
// Importing body-parser
const bodyParser = require('body-parser');

// Importing adminRoutes.js from routes folder
const adminRoutes = require('./routes/admin.js');
// Importing shop.js from the routes folder
const shopRoutes = require('./routes/shop.js');

// Creating an express application and putting it in a const
// by running it as a function 
// this app constant also happens to be a valid request handler
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next)=> {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);