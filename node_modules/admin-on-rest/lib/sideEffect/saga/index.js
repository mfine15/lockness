'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = require('redux-saga/effects');

var _crudFetch = require('./crudFetch');

var _crudFetch2 = _interopRequireDefault(_crudFetch);

var _referenceFetch = require('./referenceFetch');

var _referenceFetch2 = _interopRequireDefault(_referenceFetch);

var _success = require('./success');

var _success2 = _interopRequireDefault(_success);

var _failure = require('./failure');

var _failure2 = _interopRequireDefault(_failure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Object} restClient A REST object with two methods: fetch() and convertResponse()
 * @param {function} successSideEffects A function returning an array of side effects to yield by saga
 * @param {function} failureSideEffects A function returning an array of side effects to yield by saga
 */
exports.default = function (restClient) {
  var successSideEffects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _success2.default;
  var failureSideEffects = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _failure2.default;
  return _regenerator2.default.mark(function rootSaga() {
    return _regenerator2.default.wrap(function rootSaga$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.fork)((0, _crudFetch2.default)(restClient, successSideEffects, failureSideEffects));

          case 2:
            _context.next = 4;
            return (0, _effects.fork)(_referenceFetch2.default);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, rootSaga, this);
  });
};

module.exports = exports['default'];