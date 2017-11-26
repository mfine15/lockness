'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Snackbar = require('material-ui/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _notificationActions = require('../../actions/notificationActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(context) {
    if (!context) return { primary1Color: '#00bcd4', accent1Color: '#ff4081' };
    var _context$muiTheme$bas = context.muiTheme.baseTheme.palette,
        primary1Color = _context$muiTheme$bas.primary1Color,
        accent1Color = _context$muiTheme$bas.accent1Color;

    return { primary1Color: primary1Color, accent1Color: accent1Color };
}

var Notification = function (_React$Component) {
    (0, _inherits3.default)(Notification, _React$Component);

    function Notification() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Notification);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Notification.__proto__ || Object.getPrototypeOf(Notification)).call.apply(_ref, [this].concat(args))), _this), _this.handleRequestClose = function () {
            _this.props.hideNotification();
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Notification, [{
        key: 'render',
        value: function render() {
            var style = {};

            var _getStyles = getStyles(this.context),
                primary1Color = _getStyles.primary1Color,
                accent1Color = _getStyles.accent1Color;

            if (this.props.type === 'warning') {
                style.backgroundColor = accent1Color;
            }
            if (this.props.type === 'confirm') {
                style.backgroundColor = primary1Color;
            }
            return _react2.default.createElement(_Snackbar2.default, {
                open: !!this.props.message,
                message: this.props.message,
                autoHideDuration: 4000,
                onRequestClose: this.handleRequestClose,
                bodyStyle: style
            });
        }
    }]);
    return Notification;
}(_react2.default.Component);

Notification.propTypes = {
    message: _react.PropTypes.string,
    type: _react.PropTypes.string.isRequired,
    hideNotification: _react.PropTypes.func.isRequired
};

Notification.defaultProps = {
    type: 'info'
};

Notification.contextTypes = {
    muiTheme: _react.PropTypes.object.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        message: state.admin.notification.text,
        type: state.admin.notification.type
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, { hideNotification: _notificationActions.hideNotification })(Notification);
module.exports = exports['default'];