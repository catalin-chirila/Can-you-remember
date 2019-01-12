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

app.use(express.static('./dist/can-you-remember'));

app.use('/api', api);

// var uristring = 'mongodb://localhost/CanYouRememberDB';
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

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname,'dist/can-you-remember/index.html'));
});

module.exports = app;