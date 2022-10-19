// Importing the file system module
const fs = require('fs');

// Creating a request listener
const requestHandler = (req, res) =>{
    const url = req.url;
    const method = req.method;

    if(url === '/') {
        res.write("<html>");
        res.write("<head> <title> Enter Message </title> </head>");
        res.write('<body><form action="/message" method="POST"><input name="message" type="text"><button type="submit">Send</button></form></body>');
        res.write("</html>")
        return res.end();
    }
    
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            // console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;  // redirection
                res.setHeader('Location', '/');  
                return res.end();
            });
            // console.log(message);
        });
    }
    
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head> <title> My First Page </title> </head>");
    res.write("<body> <h1> Hello form my Node.js server! </h1> </body>")
    res.write("</html>")
    res.end();
}

// Exporting the request listener module
// Method 1
module.exports = {
    handler: requestHandler,
    someText: 'The message.txt has the following data in it: '
};

// Method 2
// module.exports = requestHandler;