'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _reactRedux = require('react-redux');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

require('isomorphic-fetch');

var _selectors = require('../client/redux/selectors');

var _store = require('../client/redux/store');

var _store2 = _interopRequireDefault(_store);

var _App = require('../client/App.js');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.static(__dirname + '/../'));
app.use(_express2.default.static(__dirname + '/../../data'));

app.get('*', function (req, res) {
  var store = (0, _store2.default)();

  var unsubscribe = store.subscribe(function () {
    var users = (0, _selectors.getUsers)(store.getState());

    if (users !== null && users.length > 0) {
      unsubscribe();

      res.set('Content-Type', 'text/html');
      res.send('\n        <html>\n          <head>\n            <title>App</title>\n            <style>\n              body {\n                font-size: 18px;\n                font-family: Verdana;\n              }\n            </style>\n          </head>\n          <body>\n            <div id="content">' + _server2.default.renderToString(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_App2.default, null)
      )) + '</div>\n            <script>\n              window.__APP_STATE = ' + JSON.stringify(store.getState()) + ';\n            </script>\n            <script src="/bundle.js"></script>\n          </body>\n        </html>\n      ');
    }
  });

  _server2.default.renderToString(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_App2.default, null)
  ));
});

app.listen(3000, function () {
  return console.log('Example app listening on port 3000!');
});