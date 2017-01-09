/* Simple Http server application */
const http = require('http');
const util = require('util');


// 1. use callback function in createServer
// var server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('<strong>Hello, world!</strong>');
// });

// 2. use it as am EventEmitter
// http.Server object is an EventEmitter.
// This means we can use `request` event
const server = http.createServer();
server.on('request', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
  });
  res.end('Hello world!\n');
});

server.listen(3000, '127.0.0.1');

util.log('Server running at http://127.0.0.1:3000');
