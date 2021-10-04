var express = require('express');
var apiRouter = require('./routes/api');
const path = require("path");

var app = express();

app.use('/static', express.static('static'))
app.use('/api',apiRouter)
app.use(express.static(path.resolve(__dirname, 'build')));


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
module.exports = app;
