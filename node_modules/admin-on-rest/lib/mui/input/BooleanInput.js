'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Toggle = require('material-ui/Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

var _title = require('../../util/title');

var _title2 = _interopRequireDefault(_title);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    block: {
        margin: '1rem 0',
        maxWidth: 250
    },
    label: {
        color: 'rgba(0, 0, 0, 0.298039)'
    },
    toggle: {
        marginBottom: 16
    }
};

var BooleanInput = function BooleanInput(_ref) {
    var input = _ref.input,
        label = _ref.label,
        source = _ref.source,
        elStyle = _ref.elStyle;
    return _react2.default.createElement(
        'div',
        { style: elStyle || styles.block },
        _react2.default.createElement(_Toggle2.default, {
            defaultToggled: !!input.value,
            onToggle: input.onChange,
            labelStyle: styles.label,
            style: styles.toggle,
            label: (0, _title2.default)(label, source)
        })
    );
};

BooleanInput.propTypes = {
    addField: _react.PropTypes.bool.isRequired,
    elStyle: _react.PropTypes.object,
    input: _react.PropTypes.object,
    label: _react.PropTypes.string,
    source: _react.PropTypes.string
};

BooleanInput.defaultProps = {
    addField: true
};

exports.default = BooleanInput;
module.exports = exports['default'];