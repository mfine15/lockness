'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _list = require('material-ui/svg-icons/action/list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListButton = function ListButton(_ref) {
    var _ref$basePath = _ref.basePath,
        basePath = _ref$basePath === undefined ? '' : _ref$basePath;
    return _react2.default.createElement(_FlatButton2.default, {
        primary: true,
        label: 'List',
        icon: _react2.default.createElement(_list2.default, null),
        containerElement: _react2.default.createElement(_reactRouter.Link, { to: basePath }),
        style: { overflow: 'inherit' }
    });
};

ListButton.propTypes = {
    basePath: _react.PropTypes.string
};

exports.default = ListButton;
module.exports = exports['default'];