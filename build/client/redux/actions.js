'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersFetched = undefined;

var _constants = require('./constants');

var usersFetched = exports.usersFetched = function usersFetched(response) {
  return { type: _constants.USERS_FETCHED, response: response };
};