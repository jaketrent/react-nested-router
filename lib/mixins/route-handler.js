var router = require('../router');
var urlStore = require('../stores/url-store');
var k = function() {};

var RouteHandler = {
  transitionTo: router.transitionTo,
  replaceWith: router.replaceWith,
  getCurrentInfo: router.getCurrentInfo,

  componentWillMount: function() {
    urlStore.on('transition', this.componentWillTransition || k);
  },

  componentWillUnmount: function() {
    urlStore.off('transition', this.componentWillTransition || k);
  }

};

module.exports = RouteHandler;

