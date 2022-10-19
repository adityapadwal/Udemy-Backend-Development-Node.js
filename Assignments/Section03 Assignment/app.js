// importing the http module
const http = require('http');
const routes = require('./routes');

// Creating the server using createServer
// CreateServer will take up requestListener as an argument
// The requestListener will be having 2 objects as their argument
// 1. The request object 
// 2. The response object
const myServer = http.createServer(routes);

// Listening the server 
// .listen will take the address of the port as its argument
myServer.listen(3000);