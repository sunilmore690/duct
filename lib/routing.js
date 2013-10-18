
/**
 * Routing glue
 */

var Map = require('railway-routes').Map;

/**
 * init routes
 * @param  {Object} duct main duct object
 * @return {void}
 */

module.exports = function(duct) {
  
  var map = duct.map = new Map(duct.app, handler);
  
  require(duct.paths.config + '/routes')(map);

  function handler(ns, ctrl, action) {

    if (ctrl in duct.controllers && action in duct.controllers[ctrl]) {
      return duct.controllers[ctrl][action];
    }

    return function notFound(req, res) {
      res.send('Handler not found for ' + controller + '#' + action);
    }

  }

};

