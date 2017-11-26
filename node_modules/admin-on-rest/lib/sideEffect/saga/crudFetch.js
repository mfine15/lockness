'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _fetchActions = require('../../actions/fetchActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crudFetch = function crudFetch(restClient) {
    var successSideEffects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return [];
    };

    var _marked = [handleFetch].map(_regenerator2.default.mark);

    var failureSideEffects = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
        return [];
    };

    function handleFetch(action) {
        var type, payload, meta, restType, response;
        return _regenerator2.default.wrap(function handleFetch$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        type = action.type, payload = action.payload, meta = action.meta;
                        restType = meta.fetch;

                        delete meta.fetch;
                        _context.next = 5;
                        return [(0, _effects.put)({ type: type + '_LOADING', payload: payload, meta: meta }), (0, _effects.put)({ type: _fetchActions.FETCH_START })];

                    case 5:
                        response = void 0;
                        _context.prev = 6;
                        _context.next = 9;
                        return (0, _effects.call)(restClient, restType, meta.resource, payload);

                    case 9:
                        response = _context.sent;
                        _context.next = 12;
                        return [(0, _effects.put)({
                            type: type + '_SUCCESS',
                            payload: response,
                            requestPayload: payload,
                            meta: meta
                        })].concat((0, _toConsumableArray3.default)(successSideEffects(type, meta.resource, payload, response).map(function (a) {
                            return (0, _effects.put)(a);
                        })), [(0, _effects.put)({ type: _fetchActions.FETCH_END })]);

                    case 12:
                        _context.next = 18;
                        break;

                    case 14:
                        _context.prev = 14;
                        _context.t0 = _context['catch'](6);
                        _context.next = 18;
                        return [(0, _effects.put)({
                            type: type + '_FAILURE',
                            error: _context.t0.message ? _context.t0.message : _context.t0,
                            requestPayload: payload,
                            meta: meta
                        })].concat((0, _toConsumableArray3.default)(failureSideEffects(type, meta.resource, payload, _context.t0).map(function (a) {
                            return (0, _effects.put)(a);
                        })), [(0, _effects.put)({ type: _fetchActions.FETCH_ERROR })]);

                    case 18:
                        _context.prev = 18;
                        _context.next = 21;
                        return (0, _effects.cancelled)();

                    case 21:
                        if (!_context.sent) {
                            _context.next = 25;
                            break;
                        }

                        _context.next = 24;
                        return (0, _effects.put)({ type: _fetchActions.FETCH_CANCEL });

                    case 24:
                        return _context.abrupt('return');

                    case 25:
                        return _context.finish(18);

                    case 26:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _marked[0], this, [[6, 14, 18, 26]]);
    }

    return _regenerator2.default.mark(function watchCrudFetch() {
        return _regenerator2.default.wrap(function watchCrudFetch$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return [(0, _reduxSaga.takeLatest)(function (action) {
                            return action.meta && action.meta.fetch && action.meta.cancelPrevious;
                        }, handleFetch), (0, _reduxSaga.takeEvery)(function (action) {
                            return action.meta && action.meta.fetch && !action.meta.cancelPrevious;
                        }, handleFetch)];

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, watchCrudFetch, this);
    });
};

exports.default = crudFetch;
module.exports = exports['default'];