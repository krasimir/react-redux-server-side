'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

function getInitialState() {
  if (typeof window !== 'undefined' && window.__APP_STATE) {
    return window.__APP_STATE;
  }
  return { users: null };
}

var reducer = function reducer() {
  var oldState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getInitialState();
  var action = arguments[1];

  if (action.type === _constants.USERS_FETCHED) {
    return { users: action.response.data };
  }
  return oldState;
};

exports.default = reducer;