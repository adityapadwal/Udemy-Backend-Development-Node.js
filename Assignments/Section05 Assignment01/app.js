const express = require('express');

const app = express();

// app.use('/', (req, res, next) => {
//     console.log('This always runs');
//     next();
// });

// The order is important
app.use('/users', (req, res, next) => {
    console.log('In the first middleware!');
    res.send('<h1>This is the users page babe!</h1>');
});

app.use('/',(req, res) => {
    console.log('In the second middleware!');
    res.send('<h1>This is the / page babe</h1>');
});

app.listen('3000');