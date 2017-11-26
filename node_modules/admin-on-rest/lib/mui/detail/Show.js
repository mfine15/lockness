'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Show = undefined;

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

var _Card = require('material-ui/Card');

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _Title = require('../layout/Title');

var _Title2 = _interopRequireDefault(_Title);

var _button = require('../button');

var _dataActions = require('../../actions/dataActions');

var _Labeled = require('../input/Labeled');

var _Labeled2 = _interopRequireDefault(_Labeled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Turns a children data structure (either single child or array of children) into an array.
 * We can't use React.Children.toArray as it loses references.
 */
var arrayizeChildren = function arrayizeChildren(children) {
    return Array.isArray(children) ? children : [children];
};

var Show = exports.Show = function (_Component) {
    (0, _inherits3.default)(Show, _Component);

    function Show() {
        (0, _classCallCheck3.default)(this, Show);
        return (0, _possibleConstructorReturn3.default)(this, (Show.__proto__ || Object.getPrototypeOf(Show)).apply(this, arguments));
    }

    (0, _createClass3.default)(Show, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.crudGetOne(this.props.resource, this.props.id, this.getBasePath());
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.id !== nextProps.id) {
                this.props.crudGetOne(nextProps.resource, nextProps.id, this.getBasePath());
            }
        }

        // FIXME Seems that the cloneElement in CrudRoute slices the children array, which makes this necessary to avoid rerenders

    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            if (nextProps.isLoading !== this.props.isLoading) {
                return true;
            }

            var currentChildren = arrayizeChildren(this.props.children);
            var newChildren = arrayizeChildren(nextProps.children);

            return newChildren.every(function (child, index) {
                return child === currentChildren[index];
            });
        }
    }, {
        key: 'getBasePath',
        value: function getBasePath() {
            var location = this.props.location;

            return location.pathname.split('/').slice(0, -2).join('/');
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                title = _props.title,
                children = _props.children,
                id = _props.id,
                data = _props.data,
                isLoading = _props.isLoading,
                resource = _props.resource,
                hasDelete = _props.hasDelete,
                hasEdit = _props.hasEdit;

            var basePath = this.getBasePath();

            return _react2.default.createElement(
                _Card.Card,
                { style: { margin: '2em', opacity: isLoading ? 0.8 : 1 } },
                _react2.default.createElement(
                    _Card.CardActions,
                    { style: { zIndex: 2, display: 'inline-block', float: 'right' } },
                    hasEdit && _react2.default.createElement(_button.EditButton, { basePath: basePath, record: data }),
                    _react2.default.createElement(_button.ListButton, { basePath: basePath }),
                    hasDelete && _react2.default.createElement(_button.DeleteButton, { basePath: basePath, record: data })
                ),
                _react2.default.createElement(_Card.CardTitle, { title: _react2.default.createElement(_Title2.default, { title: title, record: data, defaultTitle: _inflection2.default.humanize(_inflection2.default.singularize(resource)) + ' #' + id }) }),
                data && _react2.default.cloneElement(children, {
                    resource: resource,
                    basePath: basePath,
                    record: data
                })
            );
        }
    }]);
    return Show;
}(_react.Component);

Show.propTypes = {
    children: _react.PropTypes.element,
    crudGetOne: _react.PropTypes.func.isRequired,
    data: _react.PropTypes.object,
    hasDelete: _react.PropTypes.bool,
    hasEdit: _react.PropTypes.bool,
    id: _react.PropTypes.string.isRequired,
    isLoading: _react.PropTypes.bool.isRequired,
    location: _react.PropTypes.object.isRequired,
    params: _react.PropTypes.object.isRequired,
    resource: _react.PropTypes.string.isRequired,
    title: _react.PropTypes.any
};

function mapStateToProps(state, props) {
    return {
        id: props.params.id,
        data: state.admin[props.resource].data[props.params.id],
        isLoading: state.admin.loading > 0
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { crudGetOne: _dataActions.crudGetOne })(Show);