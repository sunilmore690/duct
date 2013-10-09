
/**
 * 
 */

var http = require('http')
  , express = require('express')
  , routing = require('./routing');

function Duct() {

  'use strict';

  var duct = this;
  
  // application root dir
  this.root = process.cwd();

  this.paths = {
    config: this.root + '/config/',
    models: this.root + '/api/models/',
    controllers: this.root + '/api/controllers/'
  };

  var app = this.app = express();

  app.configure(function() {
    app.use(express.logger('dev'));
    app.use(express.methodOverride());
    app.use(express.errorHandler());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(app.router);
  });

  routing.init(this);

}

/**
 * creates our app server
 * @return {void}
 */

Duct.prototype.createServer = function() {
  http.createServer(this.app).listen(3000);
};

module.exports = Duct;  
