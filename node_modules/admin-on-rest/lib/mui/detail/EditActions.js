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

var _button = require('../button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right'
};

var EditActions = function EditActions(_ref) {
    var basePath = _ref.basePath,
        data = _ref.data,
        hasDelete = _ref.hasDelete,
        hasShow = _ref.hasShow,
        refresh = _ref.refresh;
    return _react2.default.createElement(
        _Card.CardActions,
        { style: cardActionStyle },
        hasShow && _react2.default.createElement(_button.ShowButton, { basePath: basePath, record: data }),
        _react2.default.createElement(_button.ListButton, { basePath: basePath }),
        hasDelete && _react2.default.createElement(_button.DeleteButton, { basePath: basePath, record: data }),
        _react2.default.createElement(_FlatButton2.default, { primary: true, label: 'Refresh', onClick: refresh, icon: _react2.default.createElement(_refresh2.default, null) })
    );
};

exports.default = EditActions;
module.exports = exports['default'];