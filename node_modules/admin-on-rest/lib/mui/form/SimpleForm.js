'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SimpleForm = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _reactRedux = require('react-redux');

var _Toolbar = require('material-ui/Toolbar');

var _validate = require('../../util/validate');

var _button = require('../button');

var _getDefaultValues = require('../form/getDefaultValues');

var _getDefaultValues2 = _interopRequireDefault(_getDefaultValues);

var _FormField = require('./FormField');

var _FormField2 = _interopRequireDefault(_FormField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SimpleForm = exports.SimpleForm = function SimpleForm(_ref) {
    var children = _ref.children,
        handleSubmit = _ref.handleSubmit,
        invalid = _ref.invalid,
        record = _ref.record,
        resource = _ref.resource,
        basePath = _ref.basePath;
    return _react2.default.createElement(
        'form',
        { onSubmit: handleSubmit },
        _react2.default.createElement(
            'div',
            { style: { padding: '0 1em 1em 1em' } },
            _react2.default.Children.map(children, function (input) {
                return _react2.default.createElement(
                    'div',
                    { key: input.props.source, style: input.props.style },
                    _react2.default.createElement(_FormField2.default, { input: input, resource: resource, record: record, basePath: basePath })
                );
            })
        ),
        _react2.default.createElement(
            _Toolbar.Toolbar,
            null,
            _react2.default.createElement(
                _Toolbar.ToolbarGroup,
                null,
                _react2.default.createElement(_button.SaveButton, { invalid: invalid })
            )
        )
    );
};

SimpleForm.propTypes = {
    children: _react.PropTypes.node,
    defaultValue: _react.PropTypes.object,
    handleSubmit: _react.PropTypes.func,
    invalid: _react.PropTypes.bool,
    record: _react.PropTypes.object,
    resource: _react.PropTypes.string,
    basePath: _react.PropTypes.string,
    validation: _react.PropTypes.func
};

var ReduxForm = (0, _reduxForm.reduxForm)({
    form: 'record-form',
    validate: _validate.validateForm
})(SimpleForm);

var mapStateToProps = function mapStateToProps(state, props) {
    return {
        initialValues: (0, _getDefaultValues2.default)(_react.Children.toArray(props.children))(props.record, props.defaultValue)
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ReduxForm);