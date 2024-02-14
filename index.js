// Mohamed
const http = require('http');
const fs = require('fs');
const EventEmitter = require('events');
const marvel = require('marvel-comics-characters'); // marvel-comics-characters

// Step 1: Instantiate an event emitter
class MyEmitter extends EventEmitter {};
const myEmitter = new MyEmitter();

// Step 3: Build a multi-route http server
const server = http.createServer((req, res) => {
    let filePath = './views/';
    switch (req.url) {
        
        case '/home':
            filePath += 'home.html';
            break;
        case '/about':
            filePath += 'about.html';
            break;
        case '/contact':
            filePath += 'contact.html';
            break;
        case '/products':
            filePath += 'products.html';
            break;
        case '/subscribe':
            filePath += 'subscribe.html';
            break;
        default:
            filePath += '404.html'; // Custom 404 page
            break;
    }

    // Step 2: Read html files from a views folder and display them
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
           
            return res.end('404 Not Found');
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });

    // Step 4: Capture and log events
    myEmitter.emit('request', req.url);
});

// Step 7: Listen on the correct port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Step 5: Log messages for each different case within the switch statement
myEmitter.on('request', (url) => {
    console.log(`Request made to ${url}`);
});

// Additional functionality using marvel-comics-characters package
const randomCharacter = marvel.random(); // Get a random Marvel character
console.log('Random Marvel Character:', randomCharacter);
