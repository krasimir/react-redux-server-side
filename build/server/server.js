'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.static(__dirname + '/../client/'));
app.use(_express2.default.static(__dirname + '/../../data'));

app.get('*', function (req, res) {
  res.set('Content-Type', 'text/html');
  res.send('\n    <html>\n      <head>\n        <title>App</title>\n        <style>\n          body {\n            font-size: 18px;\n            font-family: Verdana;\n          }\n        </style>\n      </head>\n      <body>\n        <div id="content"></div>\n        <script src="/app.js"></script>\n      </body>\n    </html>\n  ');
});

app.listen(3000, function () {
  return console.log('Example app listening on port 3000!');
});