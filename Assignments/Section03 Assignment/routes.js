// importing the fs module
const fs = require('fs');

// Creating the request handler 
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/')
    {
        res.setHeader('Content-Type', 'Text/HTML');
        res.write('<html>');
        res.write('<head><title>Welcome /</title></head>');
        res.write('<body> <h1> Please fill the form below </h1> </body>');
        res.write('<body><form action="/create-user" method="POST"><input name="username" type="text"><button type="submit">Send Message</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/create-user' && method === 'POST'){
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody.split('=')[1]);
        }); 

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    if(url === '/users')
    {
        res.write('<html>');
        res.write('<head><title>Welcome /user</title></head>');
        res.write('<body> <h1> Greeting from /users page! </h1> </body>');
        res.write('<body><ul><li>User 1</li><li>User 2</li><li>User 3</li><li>User 4</li><li>User 5</li></ul></body>');
        res.write('</html>');
        return res.end();
    }

    res.setHeader('Content-Type', 'Text/HTML');
    res.write('<html>');
    res.write('<head><title>Section03 Assignment01</title></head>');
    res.write('<body> <h1>Error!!! Page Not Found</h1> </body>');
    res.write('<body> <form action="/users"> </form> </body>');
    res.write('</html>');
    res.end();
};

module.exports = requestHandler;