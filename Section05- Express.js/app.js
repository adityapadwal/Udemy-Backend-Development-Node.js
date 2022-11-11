// Importing the http module
const http = require('http');

// Import express 
const express = require('express');

// Creating an express application an putting it in a const
// by running it as a function
const app = express();
// This app is also a valid request handler, hence we are passing it to the createServer function

const server = http.createServer(app);

server.listen(3000);