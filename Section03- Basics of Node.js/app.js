// Importing the http module.
const http = require('http');
const { handler } = require('./routes');
// Importing the routes module locally which handles all the event listeners
const routes = require('./routes');

// createServer function will have the requestListener funtion as an argument
// which will be executed for every incoming request (requestListener is an event listener)

// The request Listener function will have two arguments (request and response objects):
// 1. req: object for the Incoming request 
// 2. res: object for the response
const server = http.createServer(routes.handler);
// console.log(routes.someText);

// Listen will start a process
// Listen will take the address of the port as the first argument
server.listen(3000);
