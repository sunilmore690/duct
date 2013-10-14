
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

  console.log(duct.paths.config + 'routes');
  // try {
    require(duct.paths.config + 'routes')(map);
  // } catch(e) {
  // }

  function handler(ns, ctrl, action) {
    if (ctrl in duct.controllers && action in duct.controllers[ctrl]) {
      return duct.controllers[ctrl][action];
    }

    return function notFound(req, res) {
      res.send('Handler not found for ' + controller + '#' + action);
    }

  }

};