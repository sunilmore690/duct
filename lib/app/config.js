module.exports = function(duct) {

  var _ = require('lodash'),
      Router = require('../router')(duct);

  return function load () {
    Router.load();
  }
};
