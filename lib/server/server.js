
/**
 * 
 */

var http = require('http')
  , express = require('express');

/**
 * Basic app server implementation
 * TODO make all of duct configurable
 */

module.exports = Server;

function Server(duct) {

  duct.app = express();

  duct.app.use(express.logger('dev'));
  duct.app.use(express.methodOverride());
  duct.app.use(express.errorHandler());
  duct.app.use(express.cookieParser());
  duct.app.use(express.bodyParser());
  duct.app.use(duct.app.router);

}

/**
 * 
 */

Server.prototype.start = function() {
  http.createServer(duct.app).listen(3000);
};