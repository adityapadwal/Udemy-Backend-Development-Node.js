// Import express 
const express = require('express');

// Creating an express application and putting it in a const
// by running it as a function 
// this app constant also happens to be a valid request handler
const app = express();

// .use() allows us to add a new middleware function
app.use('/', (req, res, next) => {
    console.log('This always runs! ');
    next();
})

app.use('/add-product',(req, res, next) => {
    console.log('In add-product middleware');
    res.send('<h1>The Add Product Page</h1>');
});

app.use('/',(req, res, next) => {
    console.log('In the middleware! ');
    res.send('<h1>Hello from express.js</h1>');
});

app.listen(3000);