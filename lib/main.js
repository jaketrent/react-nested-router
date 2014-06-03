var Link = require('./components/link');
var Route = require('./components/route');
var Routes = require('./components/routes');
var router = require('./router');
var RouteHandler = require('./mixins/route-handler');

module.exports = {
  Link: Link,
  Route: Route,
  Routes: Routes,
  transitionTo: router.transitionTo,
  replaceWith: router.replaceWith,
  getCurrentInfo: router.getCurrentInfo,
  RouteHandler: RouteHandler
};

