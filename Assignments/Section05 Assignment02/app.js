const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/users.js');

const rootRoutes = require('./routes/index.js');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);
app.use(rootRoutes);

app.listen(3000);
