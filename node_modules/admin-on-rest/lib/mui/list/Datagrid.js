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

var _DatagridCell = require('./DatagridCell');

var _DatagridCell2 = _interopRequireDefault(_DatagridCell);

var _DatagridHeaderCell = require('./DatagridHeaderCell');

var _DatagridHeaderCell2 = _interopRequireDefault(_DatagridHeaderCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStyles = {
    table: {
        backgroundColor: '#fff',
        padding: '0px 24px',
        width: '100%',
        borderCollapse: 'collapse',
        borderSpacing: 0
    },
    tbody: {
        height: 'inherit'
    },
    tr: {
        borderBottom: '1px solid rgb(224, 224, 224)',
        color: 'rgba(0, 0, 0, 0.870588)',
        height: 48
    },
    header: {
        th: {
            padding: 0
        },
        'th:first-child': {
            padding: '0 0 0 12px'
        }
    },
    cell: {
        td: {
            padding: '0 12px',
            whiteSpace: 'normal'
        },
        'td:first-child': {
            padding: '0 12px 0 16px',
            whiteSpace: 'normal'
        }
    }
};

/**
 * The Datagrid component renders a list of records as a table.
 * It is usually used as a child of the <List> and <ReferenceManyField> components.
 *
 * Props:
 *  - styles
 *  - rowStyle
 *
 * @example Display all posts as a datagrid
 * const postRowStyle = (record, index) => ({
 *     backgroundColor: record.nb_views >= 500 ? '#efe' : 'white',
 * });
 * export const PostList = (props) => (
 *     <List {...props}>
 *         <Datagrid rowStyle={postRowStyle}>
 *             <TextField source="id" />
 *             <TextField source="title" />
 *             <TextField source="body" />
 *             <EditButton />
 *         </Datagrid>
 *     </List>
 * );
 *
 * @example Display all the comments of the current post as a datagrid
 * <ReferenceManyField reference="comments" target="post_id">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="body" />
 *         <DateField source="created_at" />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceManyField>
 */

var Datagrid = function (_Component) {
    (0, _inherits3.default)(Datagrid, _Component);

    function Datagrid() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Datagrid);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Datagrid.__proto__ || Object.getPrototypeOf(Datagrid)).call.apply(_ref, [this].concat(args))), _this), _this.updateSort = function (event) {
            event.stopPropagation();
            _this.props.setSort(event.currentTarget.dataset.sort);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Datagrid, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                resource = _props.resource,
                children = _props.children,
                ids = _props.ids,
                data = _props.data,
                currentSort = _props.currentSort,
                basePath = _props.basePath,
                _props$styles = _props.styles,
                styles = _props$styles === undefined ? defaultStyles : _props$styles,
                rowStyle = _props.rowStyle;

            return _react2.default.createElement(
                'table',
                { style: styles.table },
                _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                        'tr',
                        { style: styles.tr },
                        _react2.default.Children.map(children, function (field, index) {
                            return _react2.default.createElement(_DatagridHeaderCell2.default, {
                                key: field.props.source || index,
                                field: field,
                                defaultStyle: index === 0 ? styles.header['th:first-child'] : styles.header.th,
                                currentSort: currentSort,
                                updateSort: _this2.updateSort
                            });
                        })
                    )
                ),
                _react2.default.createElement(
                    'tbody',
                    { style: styles.tbody },
                    ids.map(function (id, rowIndex) {
                        return _react2.default.createElement(
                            'tr',
                            { style: rowStyle ? rowStyle(data[id], rowIndex) : styles.tr, key: id },
                            _react2.default.Children.map(children, function (field, index) {
                                return _react2.default.createElement(_DatagridCell2.default, (0, _extends3.default)({
                                    key: id + '-' + (field.props.source || index),
                                    record: data[id],
                                    defaultStyle: index === 0 ? styles.cell['td:first-child'] : styles.cell.td
                                }, { field: field, basePath: basePath, resource: resource }));
                            })
                        );
                    })
                )
            );
        }
    }]);
    return Datagrid;
}(_react.Component);

Datagrid.propTypes = {
    ids: _react.PropTypes.arrayOf(_react.PropTypes.any).isRequired,
    resource: _react.PropTypes.string,
    data: _react.PropTypes.object.isRequired,
    currentSort: _react.PropTypes.shape({
        sort: _react.PropTypes.string,
        order: _react.PropTypes.string
    }),
    basePath: _react.PropTypes.string,
    setSort: _react.PropTypes.func,
    styles: _react.PropTypes.object,
    rowStyle: _react.PropTypes.func
};

Datagrid.defaultProps = {
    data: {},
    ids: []
};

exports.default = Datagrid;
module.exports = exports['default'];