
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var mongoose = require('mongoose');
var config = require('nconf');
config.file(path.join(__dirname, 'config.json'));

mongoose.connect(config.get('database').url);

var db = mongoose.connection;
db.on('error', function() {
  console.log('Db error');
});

db.on('open', function() {
  console.log('Db open');
});

var UserModel = require(path.join(__dirname, 'models/user'))(config, mongoose);
var test_user = new UserModel.User({
  name: {
    first_name: 'Phi',
    last_name: 'Van Ngoc'
  },
  email: 'ngocketit@gmail.com',
  password: 'dfdfdfdfd'
});

UserModel.User.find({}, function(error, data) {
  console.log(data);
});

var app = express();

// Use configure() in case we want different settings for different environments
app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(express.cookieParser(config.get('security').cookie_secret));
  app.use(express.session());

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
 
  if ('production' == app.get('env')) {
    app.use(express.static(path.join(__dirname, 'dist')));
  }
  else {
    app.use(express.static(path.join(__dirname, 'app')));
    app.locals.pretty = true;
    // This needs to come after router middleware
    app.use(express.errorHandler());
  }
});

require('./routes/user')(app, UserModel);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
