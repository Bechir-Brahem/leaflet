var express = require('express');
var apiRouter = require('./routes/api');

var app = express();

app.use('/static', express.static('static'))
app.use('/api',apiRouter)


module.exports = app;
