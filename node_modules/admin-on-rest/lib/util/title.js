'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (label, source) {
    if (typeof label !== 'undefined') return label;
    if (typeof source !== 'undefined') return _inflection2.default.humanize(source);
    return '';
};

module.exports = exports['default'];