'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReferenceManyField = undefined;

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

var _LinearProgress = require('material-ui/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _dataActions = require('../../actions/dataActions');

var _oneToMany = require('../../reducer/references/oneToMany');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Render related records to the current one.
 *
 * You must define the fields to be passed to the iterator component as children.
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
 *
 * @example Display all the books by the current author, only the title
 * <ReferenceManyField reference="books" target="author_id">
 *     <SingleFieldList>
 *         <ChipField source="title" />
 *     </SingleFieldList>
 * </ReferenceManyField>
 */
var ReferenceManyField = exports.ReferenceManyField = function (_Component) {
    (0, _inherits3.default)(ReferenceManyField, _Component);

    function ReferenceManyField() {
        (0, _classCallCheck3.default)(this, ReferenceManyField);
        return (0, _possibleConstructorReturn3.default)(this, (ReferenceManyField.__proto__ || Object.getPrototypeOf(ReferenceManyField)).apply(this, arguments));
    }

    (0, _createClass3.default)(ReferenceManyField, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var relatedTo = (0, _oneToMany.nameRelatedTo)(this.props.reference, this.props.record.id, this.props.resource, this.props.target);
            this.props.crudGetManyReference(this.props.reference, this.props.target, this.props.record.id, relatedTo);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.record.id !== nextProps.record.id) {
                var relatedTo = (0, _oneToMany.nameRelatedTo)(nextProps.reference, nextProps.record.id, nextProps.resource, nextProps.target);
                this.props.crudGetManyReference(nextProps.reference, nextProps.target, nextProps.record.id, relatedTo);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                resource = _props.resource,
                reference = _props.reference,
                referenceRecords = _props.referenceRecords,
                children = _props.children,
                basePath = _props.basePath;

            if (_react2.default.Children.count(children) !== 1) {
                throw new Error('<ReferenceManyField> only accepts a single child (like <Datagrid>)');
            }
            if (typeof referenceRecords === 'undefined') {
                return _react2.default.createElement(_LinearProgress2.default, { style: { marginTop: '1em' } });
            }
            var referenceBasePath = basePath.replace(resource, reference); // FIXME obviously very weak
            return _react2.default.cloneElement(children, {
                resource: reference,
                ids: Object.keys(referenceRecords),
                data: referenceRecords,
                basePath: referenceBasePath,
                currentSort: {}
            });
        }
    }]);
    return ReferenceManyField;
}(_react.Component);

ReferenceManyField.propTypes = {
    addLabel: _react.PropTypes.bool,
    basePath: _react.PropTypes.string.isRequired,
    children: _react.PropTypes.element.isRequired,
    crudGetManyReference: _react.PropTypes.func.isRequired,
    label: _react.PropTypes.string,
    record: _react.PropTypes.object,
    reference: _react.PropTypes.string.isRequired,
    referenceRecords: _react.PropTypes.object,
    resource: _react.PropTypes.string.isRequired,
    source: _react.PropTypes.string.isRequired,
    target: _react.PropTypes.string.isRequired
};

function mapStateToProps(state, props) {
    var relatedTo = (0, _oneToMany.nameRelatedTo)(props.reference, props.record.id, props.resource, props.target);
    return {
        referenceRecords: (0, _oneToMany.getReferences)(state, props.reference, relatedTo)
    };
}

var ConnectedReferenceManyField = (0, _reactRedux.connect)(mapStateToProps, {
    crudGetManyReference: _dataActions.crudGetManyReference
})(ReferenceManyField);

ConnectedReferenceManyField.defaultProps = {
    addLabel: true,
    source: ''
};

exports.default = ConnectedReferenceManyField;