var emitter = require('event-emitter')();

var CHANGE_EVENTS = {
  hash: 'hashchange',
  history: 'popstate'
};

var _location;

/**
 * Returns the type of navigation that is currently being used.
 */
exports.getLocation = getLocation;
function getLocation() {
  return _location || 'hash';
}

/**
 * Setup the URL store to get the value of the current path from window.location
 * as it changes. The location argument may be either "hash" (the default) or
 * "history" and specifies the type of change that should be listened for, hashchange
 * or popstate respectively.
 */
exports.setup = setup;
function setup(location) {
  if (_location)
    throw new Error('Cannot setup URL store twice');

  var changeEvent = CHANGE_EVENTS[location];

  if (!changeEvent)
    throw new Error('Invalid URL location: ' + location);

  _location = location;

  if (location === 'hash' && getCurrentPathUsingLocation(location) === '')
    pushHash('/');

  window.addEventListener(changeEvent, handleStateChange, false);

  handleStateChange();
}

/**
 * Stops listening for changes to window.location.
 */
exports.teardown = teardown;
function teardown() {
  if (!_location)
    return;

  window.removeEventListener(CHANGE_EVENTS[_location], handleStateChange);

  _location = null;
}

var _currentPath;

/**
 * Returns the value of the current URL path.
 */
exports.getCurrentPath = getCurrentPath;
function getCurrentPath() {
  return _currentPath;
}

/**
 * Updates the value of the current URL path and notifies subscribers of the change.
 */
exports.updateCurrentPath = updateCurrentPath;
function updateCurrentPath(path) {
  _currentPath = path;
  notifyChange();
}

function getCurrentPathUsingLocation(location) {
  var pathname = location === 'history' ? window.location.pathname : window.location.hash.substr(1);
  return pathname.replace(/^\//, '');
}

function handleStateChange() {
  updateCurrentPath(getCurrentPathUsingLocation(getLocation()));
}

/**
 * Pushes the given path onto the browser navigation stack.
 */
exports.push = push;
function push(path) {
  var cancel = false;

  var transition = {
    cancel: function() {
      cancel = true;
    }
  };

  emitter.emit('transition', transition);

  if (cancel)
    return;
  getLocation() === 'history' ? pushHistory(path) : pushHash(path);
}

function pushHash(path) {
  window.location.hash = path;
}

function pushHistory(path) {
  window.history.pushState({path: path}, '', path);
  handleStateChange();
}

/**
 * Replaces the current URL path with the given path without adding an entry
 * to the browser's history.
 */
exports.replace = replace;
function replace(path) {
  return getLocation() === 'history' ? replaceHistory(path) : replaceHash(path);
}

function replaceHash(path) {
  window.location.replace(path);
}

function replaceHistory(path) {
  window.history.replaceState({path: path}, '', path);
  handleStateChange();
}

// TODO: pubsub could probably be its own module.

exports.subscribe = subscribe;
function subscribe(fn) {
  emitter.on('change', fn);
}

exports.unsubscribe = unsubscribe;
function unsubscribe(fn) {
  emitter.off('change', fn);
}

function notifyChange() {
  emitter.emit('change');
}

exports.on = function(topic, handler) {
  emitter.on(topic, handler);
};

exports.off = function(topic, handler) {
  emitter.off(topic, handler);
};

exports.cancelActiveTransition = function() {
  var can
}
