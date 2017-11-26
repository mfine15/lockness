'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _List = require('material-ui/List');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = function Menu(_ref) {
    var resources = _ref.resources;
    return _react2.default.createElement(
        _Paper2.default,
        { style: { flex: '0 0 15em', order: -1 } },
        _react2.default.createElement(
            _List.List,
            null,
            resources.filter(function (r) {
                return r.list;
            }).map(function (resource) {
                return _react2.default.createElement(_List.ListItem, {
                    key: resource.name,
                    containerElement: _react2.default.createElement(_reactRouter.Link, { to: '/' + resource.name }),
                    primaryText: resource.options.label || _inflection2.default.humanize(_inflection2.default.pluralize(resource.name)),
                    leftIcon: _react2.default.createElement(resource.icon, null)
                });
            })
        )
    );
};

Menu.propTypes = {
    resources: _react.PropTypes.array.isRequired
};

exports.default = Menu;
module.exports = exports['default'];