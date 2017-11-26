'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.defaultsdeep');

var _lodash2 = _interopRequireDefault(_lodash);

var _Table = require('material-ui/Table');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatagridCell = function DatagridCell(_ref) {
    var field = _ref.field,
        record = _ref.record,
        basePath = _ref.basePath,
        resource = _ref.resource,
        defaultStyle = _ref.defaultStyle;

    var style = (0, _lodash2.default)({}, field.props.style, field.type.defaultProps ? field.type.defaultProps.style : {}, defaultStyle);
    return _react2.default.createElement(
        _Table.TableRowColumn,
        { style: style },
        _react2.default.createElement(field.type, (0, _extends3.default)({}, field.props, { record: record, basePath: basePath, resource: resource }))
    );
};

DatagridCell.propTypes = {
    field: _react.PropTypes.element,
    record: _react.PropTypes.object, // eslint-disable-line react/forbid-prop-types
    basePath: _react.PropTypes.string,
    resource: _react.PropTypes.string,
    defaultStyle: _react.PropTypes.shape({
        td: _react.PropTypes.object,
        'td:first-child': _react.PropTypes.object
    })
};

exports.default = DatagridCell;
module.exports = exports['default'];