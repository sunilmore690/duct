
/**
 * 
 */

function databaseConfig (duct) {

  var mongoose = require('mongoose');

  mongoose.set('debug', true);

  var connection = mongoose.connect( duct.config.db.uri, duct.config.db.options );

  return connection;
};

module.exports = databaseConfig;