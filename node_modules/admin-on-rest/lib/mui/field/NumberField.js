'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasNumberFormat = !!((typeof Intl === 'undefined' ? 'undefined' : (0, _typeof3.default)(Intl)) === 'object' && Intl && typeof Intl.NumberFormat === 'function');

/**
 * Display a numeric value as a locale string.
 *
 * Uses Intl.NumberFormat() if available, passing the locales and options props as arguments.
 * If Intl is not available, it outputs number as is (and ignores the locales and options props).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
 * @example
 * <NumberField source="score" />
 * // renders the record { id: 1234, score: 567 } as
 * <span>567</span>
 *
 * <NumberField source="score" elStyle={{ color: 'red' }} />
 * // renders the record { id: 1234, score: 567 } as
 * <span style="color:red;">567</span>
 *
 * <NumberField source="share" options={{ style: 'percent' }} />
 * // renders the record { id: 1234, share: 0.2545 } as
 * <span>25%</span>
 *
 * <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
 * // renders the record { id: 1234, price: 25.99 } as
 * <span>$25.99</span>
 *
 * <NumberField source="price" locales="fr-FR" options={{ style: 'currency', currency: 'USD' }} />
 * // renders the record { id: 1234, price: 25.99 } as
 * <span>25,99 $US</span>
 */
var NumberField = function NumberField(_ref) {
    var record = _ref.record,
        source = _ref.source,
        locales = _ref.locales,
        options = _ref.options,
        elStyle = _ref.elStyle;

    if (!record) return null;
    var value = (0, _lodash2.default)(record, source);
    if (value == null) return null;
    if (!hasNumberFormat) return _react2.default.createElement(
        'span',
        { style: elStyle },
        value
    );
    return _react2.default.createElement(
        'span',
        { style: elStyle },
        value.toLocaleString(locales, options)
    );
};

NumberField.propTypes = {
    addLabel: _react.PropTypes.bool,
    elStyle: _react.PropTypes.object,
    label: _react.PropTypes.string,
    locales: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]),
    options: _react.PropTypes.object,
    record: _react.PropTypes.object,
    source: _react.PropTypes.string.isRequired
};

NumberField.defaultProps = {
    addLabel: true,
    style: { textAlign: 'right' },
    headerStyle: { textAlign: 'right' }
};

exports.default = NumberField;
module.exports = exports['default'];