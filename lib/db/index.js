
/**
 * 
 */

var mongoose = require('mongoose');

// TODO make this config based
mongoose.set('debug', true); 

// TODO make this config based
var connection = mongoose.connect('mongodb://handw:5bttny@ds039257.mongolab.com:39257/handw');

// export our connection pool for 
// use with session storage
exports.connection = connection;