
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
    console.log(arguments);
  // }

  function handler(ns, ctrl, action) {
    console.log('handler');
    console.log(duct.controllers);
    console.log(duct.controllers[ctrl]);
    console.log(duct.controllers[ctrl][action]);
    if ('ctrl' in duct.controllers && 'action' in duct.controllers[ctrl]) {
      return duct.controllers[ctrl][action] || function (req, res) {
        res.send('Handler not found for ' + controller + '#' + action);
      };  
    }
  }

};