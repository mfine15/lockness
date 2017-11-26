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

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _save = require('material-ui/svg-icons/content/save');

var _save2 = _interopRequireDefault(_save);

var _CircularProgress = require('material-ui/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SaveButton = function (_Component) {
    (0, _inherits3.default)(SaveButton, _Component);

    function SaveButton() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, SaveButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SaveButton.__proto__ || Object.getPrototypeOf(SaveButton)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
            if (_this.props.saving) {
                // prevent double submission
                e.preventDefault();
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(SaveButton, [{
        key: 'render',
        value: function render() {
            var saving = this.props.saving;

            return _react2.default.createElement(_RaisedButton2.default, {
                type: 'submit',
                label: 'Save',
                icon: saving ? _react2.default.createElement(_CircularProgress2.default, { size: 25, thickness: 2 }) : _react2.default.createElement(_save2.default, null),
                onClick: this.handleClick,
                primary: !saving,
                style: {
                    margin: '10px 24px',
                    position: 'relative'
                }
            });
        }
    }]);
    return SaveButton;
}(_react.Component);

SaveButton.propTypes = {
    saving: _react.PropTypes.bool
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        saving: state.admin.saving
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SaveButton);
module.exports = exports['default'];