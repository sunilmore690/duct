
/**
 * 
 */

var mongoose = require('mongoose');

/**
 * 
 */

module.exports = function(duct) {

  var connection;

  if (duct.config.db.logLevel === 'debug') {
    mongoose.set('debug', true);
  }

  connection = mongoose.connect(duct.config.db.uri, duct.config.db.options);

  return connection

};