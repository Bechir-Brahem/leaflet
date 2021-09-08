var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');

var app = express();

app.set('view engine', 'twig');
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static('public'))


app.use('/', indexRouter);



module.exports = app;
