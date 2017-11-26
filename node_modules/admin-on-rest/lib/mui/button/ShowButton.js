'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _removeRedEye = require('material-ui/svg-icons/image/remove-red-eye');

var _removeRedEye2 = _interopRequireDefault(_removeRedEye);

var _linkToRecord = require('../../util/linkToRecord');

var _linkToRecord2 = _interopRequireDefault(_linkToRecord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShowButton = function ShowButton(_ref) {
    var _ref$basePath = _ref.basePath,
        basePath = _ref$basePath === undefined ? '' : _ref$basePath,
        _ref$record = _ref.record,
        record = _ref$record === undefined ? {} : _ref$record;
    return _react2.default.createElement(_FlatButton2.default, {
        primary: true,
        label: 'Show',
        icon: _react2.default.createElement(_removeRedEye2.default, null),
        containerElement: _react2.default.createElement(_reactRouter.Link, { to: (0, _linkToRecord2.default)(basePath, record.id) + '/show' }),
        style: { overflow: 'inherit' }
    });
};

ShowButton.propTypes = {
    basePath: _react.PropTypes.string,
    record: _react.PropTypes.object
};

exports.default = ShowButton;
module.exports = exports['default'];