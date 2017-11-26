'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _title = require('../../util/title');

var _title2 = _interopRequireDefault(_title);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An Input component for a number
 *
 * @example
 * <NumberInput source="nb_views" />
 *
 * You can customize the `step` props (which defaults to "any")
 * @example
 * <NumberInput source="nb_views" step={1} />
 *
 * The object passed as `options` props is passed to the material-ui <TextField> component
 */
var NumberInput = function (_Component) {
    (0, _inherits3.default)(NumberInput, _Component);

    function NumberInput() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, NumberInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = NumberInput.__proto__ || Object.getPrototypeOf(NumberInput)).call.apply(_ref, [this].concat(args))), _this), _this.handleBlur = function () {
            _this.props.input.onChange(parseFloat(_this.props.input.value));
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
    /**
     * Necessary because of a React bug on <input type="number">
     * @see https://github.com/facebook/react/issues/1425
     */


    (0, _createClass3.default)(NumberInput, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                elStyle = _props.elStyle,
                input = _props.input,
                label = _props.label,
                _props$meta = _props.meta,
                touched = _props$meta.touched,
                error = _props$meta.error,
                options = _props.options,
                source = _props.source,
                step = _props.step;

            return _react2.default.createElement(_TextField2.default, (0, _extends3.default)({
                value: input.value,
                onChange: input.onChange,
                onBlur: this.handleBlur,
                type: 'number',
                step: step,
                floatingLabelText: (0, _title2.default)(label, source),
                errorText: touched && error,
                style: elStyle
            }, options));
        }
    }]);
    return NumberInput;
}(_react.Component);

NumberInput.propTypes = {
    addField: _react.PropTypes.bool.isRequired,
    elStyle: _react.PropTypes.object,
    input: _react.PropTypes.object,
    label: _react.PropTypes.string,
    meta: _react.PropTypes.object,
    name: _react.PropTypes.string,
    onChange: _react.PropTypes.func,
    options: _react.PropTypes.object,
    source: _react.PropTypes.string,
    step: _react.PropTypes.string.isRequired,
    validation: _react.PropTypes.object
};

NumberInput.defaultProps = {
    addField: true,
    options: {},
    step: 'any'
};

exports.default = NumberInput;
module.exports = exports['default'];