'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _AppBar = require('material-ui/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _CircularProgress = require('material-ui/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

var _Notification = require('./Notification');

var _Notification2 = _interopRequireDefault(_Notification);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactTapEventPlugin2.default)();

var Layout = function Layout(_ref) {
    var isLoading = _ref.isLoading,
        children = _ref.children,
        route = _ref.route,
        title = _ref.title,
        theme = _ref.theme;

    var Title = _react2.default.createElement(
        _reactRouter.Link,
        { to: '/', style: { color: '#fff', textDecoration: 'none' } },
        title
    );
    var RightElement = isLoading ? _react2.default.createElement(_CircularProgress2.default, { color: '#fff', size: 30, thickness: 2, style: { margin: 8 } }) : _react2.default.createElement('span', null);
    var muiTheme = (0, _getMuiTheme2.default)(theme);

    return _react2.default.createElement(
        _MuiThemeProvider2.default,
        { muiTheme: muiTheme },
        _react2.default.createElement(
            'div',
            { style: { display: 'flex', flexDirection: 'column', minHeight: '100vh' } },
            _react2.default.createElement(_AppBar2.default, { title: Title, iconElementRight: RightElement }),
            _react2.default.createElement(
                'div',
                { className: 'body', style: { display: 'flex', flex: '1', backgroundColor: '#edecec' } },
                _react2.default.createElement(
                    'div',
                    { style: { flex: 1 } },
                    children
                ),
                _react2.default.createElement(_Menu2.default, { resources: route.resources })
            ),
            _react2.default.createElement(_Notification2.default, null)
        )
    );
};

Layout.propTypes = {
    isLoading: _react.PropTypes.bool.isRequired,
    children: _react.PropTypes.node,
    route: _react.PropTypes.object.isRequired,
    title: _react.PropTypes.string.isRequired,
    theme: _react.PropTypes.object.isRequired
};
Layout.defaultProps = {
    theme: {
        tabs: {
            backgroundColor: 'white',
            selectedTextColor: '#00bcd4',
            textColor: '#757575'
        },
        inkBar: {
            backgroundColor: '#00bcd4'
        }
    }
};

function mapStateToProps(state) {
    return { isLoading: state.admin.loading > 0 };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Layout);
module.exports = exports['default'];