const express = require('express');
const util = require('util');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const server = app.listen(3000, () => {
  util.log(`Server running at http://localhost:${server.address().port}`);
});
