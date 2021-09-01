var express = require('express');
var path = require('path');
var twig = require('twig');
const {TwingEnvironment, TwingLoaderFilesystem} = require('twing');
  let loader = new TwingLoaderFilesystem('./views');
let twing = new TwingEnvironment(loader);


//function just to avoid typing promises when rendering
render=function(template, context,res){
  twing.render(template, context).then((output) => {
      res.end(output);
    });
  
}

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static('public'))


app.use('/', indexRouter);



module.exports = app;
