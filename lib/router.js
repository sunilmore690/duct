
/**
 * 
 */

var routing = require('railway-routes');

exports.init = function (duct) {
  var map = new routing.Map(duct.app, handler);
  map.resources('users');

  function handler(ns, controller, action) {
    console.log(arguments);
    try {
        var ctlFile = duct.root + '/api/controllers/' + ns + controller + '_controller';
        var responseHandler =  require(ctlFile)[action];
    } catch(e) {
      console.log(e);
    }
    return responseHandler || function (req, res) {
        res.send('Handler not found for ' + ns + controller + '#' + action);
    };
  }

};

