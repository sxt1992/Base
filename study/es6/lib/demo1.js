'use strict';

require('babel-polyfill');

var _cats = require('./cats');

var _cats2 = _interopRequireDefault(_cats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$('<h1>Cats</h1>').appendTo('body');
var ul = $('<ul></ul>').appendTo('body');
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = _cats2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var cat = _step.value;

    $('<li></li>').text(cat).appendTo(ul);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}