"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (children) {
    return function () {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var defaultValueFromChildren = children.map(function (child) {
            return { source: child.props.source, defaultValue: child.props.defaultValue };
        }).reduce(function (prev, next) {
            if (next.defaultValue != null) {
                prev[next.source] = next.defaultValue; // eslint-disable-line no-param-reassign
            }
            return prev;
        }, {});
        return (0, _extends3.default)({}, defaultValue, defaultValueFromChildren, data);
    };
};

module.exports = exports["default"];