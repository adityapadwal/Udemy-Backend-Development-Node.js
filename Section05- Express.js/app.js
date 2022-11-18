// Import express 
const express = require('express');
// Inporting body-parser
const bodyParser = require('body-parser');

// Creating an express application and putting it in a const
// by running it as a function 
// this app constant also happens to be a valid request handler
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product',(req, res, next) => {
    res.send('<form action="/product" method="POST"> <input type="text" name="title"> <button type="submit">Add Product</button> </form>');
});

app.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/',(req, res, next) => {
    res.send('<h1>Hello from express.js</h1>');
});

app.listen(3000);