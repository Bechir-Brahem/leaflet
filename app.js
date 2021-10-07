var express = require('express');
var path = require('path');
var apiRouter = require('./routes/api');

var indexRouter = require('./routes/index');

var app = express();

app.set('view engine', 'twig');
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static('public'))
app.use('/api', apiRouter)
app.use(express.static(path.resolve(__dirname, 'build2')));
app.use(express.static(path.resolve(__dirname, 'build1')));

app.get('/react2', (req, res) => {
    console.log("react2")
    res.sendFile(path.resolve(__dirname, 'build2', 'index.html'));
});
app.get('/react1', (req, res) => {
    console.log("react2")
    res.sendFile(path.resolve(__dirname, 'build1', 'index.html'));
});


app.use('/', indexRouter);
app.use('/js', indexRouter);


module.exports = app;
