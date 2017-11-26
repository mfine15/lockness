'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Resource = exports.CrudRoute = exports.Admin = exports.fetchUtils = exports.crudSaga = exports.queryReducer = exports.adminReducer = undefined;

var _actions = require('./actions');

Object.keys(_actions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actions[key];
    }
  });
});

var _rest = require('./rest');

Object.keys(_rest).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _rest[key];
    }
  });
});

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _queryReducer2 = require('./reducer/resource/list/queryReducer');

var _queryReducer3 = _interopRequireDefault(_queryReducer2);

var _saga = require('./sideEffect/saga');

var _saga2 = _interopRequireDefault(_saga);

var _fetch = require('./util/fetch');

var _fetchUtils = _interopRequireWildcard(_fetch);

var _Admin2 = require('./Admin');

var _Admin3 = _interopRequireDefault(_Admin2);

var _CrudRoute2 = require('./CrudRoute');

var _CrudRoute3 = _interopRequireDefault(_CrudRoute2);

var _Resource2 = require('./Resource');

var _Resource3 = _interopRequireDefault(_Resource2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.adminReducer = _reducer2.default;
exports.queryReducer = _queryReducer3.default;
exports.crudSaga = _saga2.default;
exports.fetchUtils = _fetchUtils;
exports.Admin = _Admin3.default;
exports.CrudRoute = _CrudRoute3.default;
exports.Resource = _Resource3.default;