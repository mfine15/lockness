'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRouterRedux = require('react-router-redux');

var _dataActions = require('../../actions/dataActions');

var _notificationActions = require('../../actions/notificationActions');

exports.default = function (type, resource, payload, error) {
    switch (type) {
        case _dataActions.CRUD_GET_ONE:
            return payload.basePath ? [(0, _notificationActions.showNotification)('Element does not exist', 'warning'), (0, _reactRouterRedux.push)(payload.basePath)] : [];
        default:
            console.error(error);
            return [(0, _notificationActions.showNotification)(error.message, 'warning')];
    }
};

module.exports = exports['default'];