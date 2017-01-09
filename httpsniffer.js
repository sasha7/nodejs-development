const util = require('util');
const url = require('url');

const reqToString = (req) => {
  let ret = `req ${req.method} ${req.httpVersion} ${req.url}\n`;

  ret += `${JSON.stringify(url.parse(req.url, true))}\n`;
  const keys = Object.keys(req.headers);

  for (let i = 0, l = keys.length; i < l; i += 1) {
    const key = keys[i];
    ret += `${i} ${key}: ${req.headers[key]} \n`;
  }

  if (req.trailers) {
    ret += `${req.trailers}\n`;
  }

  return ret;
};

const sniffOn = (server) => {
  server.on('request', (req, res) => {
    util.log('event_request');
    util.log(reqToString(req));
  });

  server.on('close', (errno) => {
    util.log(`event_close errno = ${errno}`);
  });

  server.on('checkContinue', (req, res) => {
    util.log('event_checkContinue');
    util.log(reqToString(req));
    res.writeContinue();
  });

  server.on('upgrade', (req, socket, head) => {
    util.log('event_upgrade');
    util.log(reqToString(req));
  });

  server.on('clientError', () => {
    util.log('event_clientError');
  });
};


exports.sniffOn = sniffOn;

exports.reqToString = reqToString;
