const http = require('http');
const util = require('util');
const url = require('url');
const os = require('os');
const sniffer = require('./httpsniffer');

const server = http.createServer();

server.on('request', (req, res) => {
  const reqUrl = url.parse(req.url, true);

  if (reqUrl.pathname === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title></title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
          <h2>Welcome!</h2>
          <p>Preview <a href="/osinfo">OS info</a></p>
        </body>
      </html>
      `);
  } else if (reqUrl.pathname === '/osinfo') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title></title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
          <h2><strong>Operating System Info</strong></h2>
          <p><strong>TMP Dir</strong> <pre>${os.tmpDir()}</pre></p>
          <p><strong>Hostname</strong> <pre>${os.hostname()}</pre></p>
          <p><strong>OS Type</strong> <pre>${os.type()} ${os.platform()} ${os.arch()} ${os.release()}</pre></p>
          <p><strong>Uptime</strong> <pre>${os.uptime()} ${util.inspect(os.loadavg())}</pre></p>
          <p><strong>CPU's</strong> <pre>${util.inspect(os.cpus())}</pre></p>
          <p><strong>Memory</strong> <pre>${os.totalmem()} / Free: ${os.freemem()}</pre></p>
          <p><strong>Network</strong> <pre>${util.inspect(os.networkInterfaces())}</pre></p>
        </body>
      </html>
    `);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
    });
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Page not found</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
          <p>Page not found!</p>
        </body>
      </html>
    `);
  }
});


server.listen(3000);

sniffer.sniffOn(server);

util.log('Server running on http://localhost:3000');
