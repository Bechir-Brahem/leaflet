var express = require('express');
var apiRouter = require('./routes/api');

var app = express();

app.use('/api',apiRouter)


module.exports = app;
