'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _add = require('material-ui/svg-icons/content/add');

var _add2 = _interopRequireDefault(_add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreateButton = function CreateButton(_ref) {
    var _ref$basePath = _ref.basePath,
        basePath = _ref$basePath === undefined ? '' : _ref$basePath;
    return _react2.default.createElement(_FlatButton2.default, {
        primary: true,
        label: 'Create',
        icon: _react2.default.createElement(_add2.default, null),
        containerElement: _react2.default.createElement(_reactRouter.Link, { to: basePath + '/create' }),
        style: { overflow: 'inherit' }
    });
};

CreateButton.propTypes = {
    basePath: _react.PropTypes.string
};

exports.default = CreateButton;
module.exports = exports['default'];