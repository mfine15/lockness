'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRouterRedux = require('react-router-redux');

var _dataActions = require('../../actions/dataActions');

var _notificationActions = require('../../actions/notificationActions');

var _linkToRecord = require('../../util/linkToRecord');

var _linkToRecord2 = _interopRequireDefault(_linkToRecord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (type, resource, payload, response) {
    switch (type) {
        case _dataActions.CRUD_UPDATE:
            return [(0, _notificationActions.showNotification)('Element updated'), (0, _reactRouterRedux.push)(payload.basePath)];
        case _dataActions.CRUD_CREATE:
            return [(0, _notificationActions.showNotification)('Element created'), (0, _reactRouterRedux.push)((0, _linkToRecord2.default)(payload.basePath, response.id))];
        case _dataActions.CRUD_DELETE:
            return [(0, _notificationActions.showNotification)('Element deleted'), (0, _reactRouterRedux.push)(payload.basePath)];
        default:
            return [];
    }
};

module.exports = exports['default'];