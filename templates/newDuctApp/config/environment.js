
/**
 * 
 */

var express = require('express');

module.exports = function(duct) {
  var app = duct.app;

  app.configure(function() {
  	console.log('in configure');
    duct.loadConfig();
    app.use(express.bodyParser());
    app.use(express.cookieParser('secret'));
    app.use(express.session({ secret: 'secret' }));
    app.use(express.methodOverride());
    app.use(app.router);
  });

};