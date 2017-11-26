'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _reduxForm = require('redux-form');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _saga = require('./sideEffect/saga');

var _saga2 = _interopRequireDefault(_saga);

var _CrudRoute = require('./CrudRoute');

var _CrudRoute2 = _interopRequireDefault(_CrudRoute);

var _Layout = require('./mui/layout/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _withProps = require('./withProps');

var _withProps2 = _interopRequireDefault(_withProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Admin = function Admin(_ref) {
    var restClient = _ref.restClient,
        dashboard = _ref.dashboard,
        children = _ref.children,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? 'Admin on REST' : _ref$title,
        theme = _ref.theme,
        _ref$appLayout = _ref.appLayout,
        appLayout = _ref$appLayout === undefined ? (0, _withProps2.default)({ title: title, theme: theme })(_Layout2.default) : _ref$appLayout;

    var resources = _react2.default.Children.map(children, function (_ref2) {
        var props = _ref2.props;
        return props;
    });
    var firstResource = resources[0].name;
    var sagaMiddleware = (0, _reduxSaga2.default)();
    var reducer = (0, _redux.combineReducers)({
        admin: (0, _reducer2.default)(resources),
        form: _reduxForm.reducer,
        routing: _reactRouterRedux.routerReducer
    });
    var store = (0, _redux.createStore)(reducer, undefined, (0, _redux.compose)((0, _redux.applyMiddleware)((0, _reactRouterRedux.routerMiddleware)(_reactRouter.hashHistory), sagaMiddleware), window.devToolsExtension ? window.devToolsExtension() : function (f) {
        return f;
    }));
    sagaMiddleware.run((0, _saga2.default)(restClient));

    var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.hashHistory, store);

    return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
            _reactRouter.Router,
            { history: history },
            dashboard ? undefined : _react2.default.createElement(_reactRouter.Redirect, { from: '/', to: '/' + firstResource }),
            _react2.default.createElement(
                _reactRouter.Route,
                { path: '/', component: appLayout, resources: resources },
                dashboard && _react2.default.createElement(_reactRouter.IndexRoute, { component: dashboard, restClient: restClient }),
                resources.map(function (resource) {
                    return _react2.default.createElement(_CrudRoute2.default, { key: resource.name, path: resource.name, list: resource.list, create: resource.create, edit: resource.edit, show: resource.show, remove: resource.remove, options: resource.options });
                })
            )
        )
    );
};

var componentPropType = _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]);

Admin.propTypes = {
    restClient: _react.PropTypes.func.isRequired,
    appLayout: componentPropType,
    dashboard: componentPropType,
    children: _react.PropTypes.node,
    title: _react.PropTypes.string,
    theme: _react.PropTypes.object
};

exports.default = Admin;
module.exports = exports['default'];