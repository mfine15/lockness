'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Card = require('material-ui/Card');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _refresh = require('material-ui/svg-icons/navigation/refresh');

var _refresh2 = _interopRequireDefault(_refresh);

var _CreateButton = require('../button/CreateButton');

var _CreateButton2 = _interopRequireDefault(_CreateButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right'
};

var Actions = function Actions(_ref) {
    var resource = _ref.resource,
        filter = _ref.filter,
        displayedFilters = _ref.displayedFilters,
        filterValues = _ref.filterValues,
        hasCreate = _ref.hasCreate,
        basePath = _ref.basePath,
        showFilter = _ref.showFilter,
        refresh = _ref.refresh;
    return _react2.default.createElement(
        _Card.CardActions,
        { style: cardActionStyle },
        filter && _react2.default.cloneElement(filter, { resource: resource, showFilter: showFilter, displayedFilters: displayedFilters, filterValues: filterValues, context: 'button' }),
        hasCreate && _react2.default.createElement(_CreateButton2.default, { basePath: basePath }),
        _react2.default.createElement(_FlatButton2.default, { primary: true, label: 'Refresh', onClick: refresh, icon: _react2.default.createElement(_refresh2.default, null) })
    );
};

exports.default = Actions;
module.exports = exports['default'];