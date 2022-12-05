// Import express
const express = require("express");
// Importing the path core module
const path = require("path");
// Importing body-parser
const bodyParser = require("body-parser");
// Importing Handlebars
// const expressHbs = require("express-handlebars");

// Importing adminRoutes.js from routes folder
const adminRoutes = require('./routes/admin.js');
// Importing shop.js from the routes folder
const shopRoutes = require('./routes/shop.js');

// Importing errors controller
const errorController = require('./controllers/error.js');

// Creating an express application and putting it in a const
// by running it as a function
// this app constant also happens to be a valid request handler
const app = express();

// app.set() allows us to set global configuration values
// ********For ejs templating engines*******
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

// This is for static serving of pages
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
