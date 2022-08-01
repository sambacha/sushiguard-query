'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var logger = require('@ethersproject/logger');
var isPlainObject = require('lodash.isplainobject');
var isEqual = require('lodash.isequal');
var useRead = require('src/hooks/useRead');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isPlainObject__default = /*#__PURE__*/_interopDefaultLegacy(isPlainObject);
var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);

function isTransactionReplacedError(error) {
  if (error.code === logger.Logger.errors.TRANSACTION_REPLACED) {
    return true;
  }

  return false;
}
function isTransactionFailedError(error) {
  var _error$message;

  if (error !== null && error !== void 0 && (_error$message = error.message) !== null && _error$message !== void 0 && _error$message.includes('-32000')) {
    return true;
  }

  return false;
}

exports.TransactionStatus = void 0;

(function (TransactionStatus) {
  TransactionStatus["SUBMITTED"] = "SUBMITTED";
  TransactionStatus["REPRICED"] = "REPRICED";
  TransactionStatus["CANCELLED"] = "CANCELLED";
  TransactionStatus["MINED"] = "MINED";
  TransactionStatus["UNCHECKED"] = "UNCHECKED";
  TransactionStatus["PROCESSING"] = "PROCESSING";
  TransactionStatus["OK"] = "OK";
  TransactionStatus["INDETERMINATE"] = "INDETERMINATE";
  TransactionStatus["ERROR"] = "ERROR";
  TransactionStatus["INVALID_PARAMS"] = "INVALID_PARAMS";
  TransactionStatus["INVALID_REQUEST"] = "INVALID_REQUEST";
})(exports.TransactionStatus || (exports.TransactionStatus = {}));

function isOverridesObject(obj) {
  if (isPlainObject__default["default"](obj)) {
    var overrides = obj;

    if ('gasPrice' in overrides || 'gasLimit' in overrides || 'value' in overrides || 'nonce' in overrides) {
      return true;
    }
  }

  return false;
}

function matchReadCallQuery(_events, _getEventFilter, query, contractAddress, methodName, callArgs) {
  var match = isEqual__default["default"](query.queryKey, useRead.makeReadCallQueryKey(contractAddress, methodName, callArgs));
  return match;
}

exports.isOverridesObject = isOverridesObject;
exports.isTransactionFailedError = isTransactionFailedError;
exports.isTransactionReplacedError = isTransactionReplacedError;
exports.matchReadCallQuery = matchReadCallQuery;
