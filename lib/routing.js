
/**
 * Routing glue
 */

var routing = require('railway-routes');

/**
 * init routes
 * @param  {Object} duct main duct object
 * @return {void}
 */

exports.init = function(duct) {
  
  var map = new routing.Map(duct.app, handler);

  require(duct.paths.config + '/routes')(map);

  function handler(ns, ctrl, action) {
    
    var file = duct.paths.controllers + ns + ctrl + '_controller';

    try {
        var responseHandler =  require(file)[action];
    } catch(e) {}

    // TODO logging
    // TODO gneric error catch
    return responseHandler || function (req, res) {
      res.send('Handler not found for ' + controller + '#' + action);
    };

  }

};