var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

var api = require('./routes/api');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));

// Old
app.use(express.static('./dist/can-you-remember'));

// New
// app.use(express.static(path.join(__dirname, 'dist')));
// app.use('/', express.static(path.join(__dirname, 'dist')));


app.use('/books', express.static(path.join(__dirname, 'dist')));
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.send();
});

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname,'/dist/can-you-remember/index.html'));
});

// var uristring =
//     process.env.MONGOLAB_URI;
var uristring = 'mongodb://heroku_x4rfzb3m:e37b2748kkgt14uspbpitub8qt@ds117136.mlab.com:17136/heroku_x4rfzb3m';

mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});


var api = require('./routes/api');
app.use(passport.initialize());
app.use('/api', api);

module.exports = app;