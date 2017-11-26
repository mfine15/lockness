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

var _Card = require('material-ui/Card');

var _Toolbar = require('material-ui/Toolbar');

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _checkCircle = require('material-ui/svg-icons/action/check-circle');

var _checkCircle2 = _interopRequireDefault(_checkCircle);

var _errorOutline = require('material-ui/svg-icons/alert/error-outline');

var _errorOutline2 = _interopRequireDefault(_errorOutline);

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _Title = require('../layout/Title');

var _Title2 = _interopRequireDefault(_Title);

var _button = require('../button');

var _dataActions = require('../../actions/dataActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Delete = function (_Component) {
    (0, _inherits3.default)(Delete, _Component);

    function Delete(props) {
        (0, _classCallCheck3.default)(this, Delete);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Delete.__proto__ || Object.getPrototypeOf(Delete)).call(this, props));

        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.goBack = _this.goBack.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(Delete, [{
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
    }, {
        key: 'getBasePath',
        value: function getBasePath() {
            var location = this.props.location;

            return location.pathname.split('/').slice(0, -2).join('/');
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            event.preventDefault();
            this.props.crudDelete(this.props.resource, this.props.id, this.getBasePath());
        }
    }, {
        key: 'goBack',
        value: function goBack() {
            this.props.history.goBack();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                title = _props.title,
                id = _props.id,
                data = _props.data,
                isLoading = _props.isLoading,
                resource = _props.resource;

            var basePath = this.getBasePath();
            return _react2.default.createElement(
                _Card.Card,
                { style: { margin: '2em', opacity: isLoading ? .8 : 1 } },
                _react2.default.createElement(
                    _Card.CardActions,
                    { style: { zIndex: 2, display: 'inline-block', float: 'right' } },
                    _react2.default.createElement(_button.ListButton, { basePath: basePath })
                ),
                _react2.default.createElement(_Card.CardTitle, { title: _react2.default.createElement(_Title2.default, { title: title, record: data, defaultTitle: 'Delete ' + _inflection2.default.humanize(_inflection2.default.singularize(resource)) + ' #' + id }) }),
                _react2.default.createElement(
                    'form',
                    { onSubmit: this.handleSubmit },
                    _react2.default.createElement(
                        _Card.CardText,
                        null,
                        'Are you sure ?'
                    ),
                    _react2.default.createElement(
                        _Toolbar.Toolbar,
                        null,
                        _react2.default.createElement(
                            _Toolbar.ToolbarGroup,
                            null,
                            _react2.default.createElement(_RaisedButton2.default, {
                                type: 'submit',
                                label: 'Yes',
                                icon: _react2.default.createElement(_checkCircle2.default, null),
                                primary: true,
                                style: {
                                    margin: '10px 24px',
                                    position: 'relative'
                                }
                            }),
                            _react2.default.createElement(_RaisedButton2.default, {
                                label: 'No',
                                icon: _react2.default.createElement(_errorOutline2.default, null),
                                onClick: this.goBack,
                                style: {
                                    margin: '10px 24px',
                                    position: 'relative'
                                }
                            })
                        )
                    )
                )
            );
        }
    }]);
    return Delete;
}(_react.Component);

Delete.propTypes = {
    title: _react.PropTypes.any,
    id: _react.PropTypes.string.isRequired,
    resource: _react.PropTypes.string.isRequired,
    location: _react.PropTypes.object.isRequired,
    params: _react.PropTypes.object.isRequired,
    history: _react.PropTypes.object.isRequired,
    data: _react.PropTypes.object,
    isLoading: _react.PropTypes.bool.isRequired,
    crudGetOne: _react.PropTypes.func.isRequired,
    crudDelete: _react.PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
    return {
        id: props.params.id,
        data: state.admin[props.resource].data[props.params.id],
        isLoading: state.admin.loading > 0
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { crudGetOne: _dataActions.crudGetOne, crudDelete: _dataActions.crudDelete })(Delete);
module.exports = exports['default'];