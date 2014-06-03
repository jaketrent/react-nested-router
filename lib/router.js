var urlStore = require('./stores/url-store');
var routeStore = require('./stores/route-store');
var Link = require('./components/link');

function transitionTo(routeName, params) {
  urlStore.push(Link.makeHref(routeName, params));
}

function replaceWith(routeName, params) {
  urlStore.replace(Link.makeHref(routeName, params));
}

function getCurrentInfo() {
  return {
    route: routeStore.getActiveRoute(),
    params: routeStore.getActiveParams(),
    query: routeStore.getActiveQuery()
  };
}

module.exports = {
  transitionTo: transitionTo,
  replaceWith: replaceWith,
  getCurrentInfo: getCurrentInfo
};

