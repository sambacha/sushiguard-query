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
  if (error?.message?.includes("-32000")) {
    return true;
  }
  return false;
}

var TransactionStatus = /* @__PURE__ */ ((TransactionStatus2) => {
  TransactionStatus2["SUBMITTED"] = "SUBMITTED";
  TransactionStatus2["REPRICED"] = "REPRICED";
  TransactionStatus2["CANCELLED"] = "CANCELLED";
  TransactionStatus2["MINED"] = "MINED";
  TransactionStatus2["UNCHECKED"] = "UNCHECKED";
  TransactionStatus2["PROCESSING"] = "PROCESSING";
  TransactionStatus2["OK"] = "OK";
  TransactionStatus2["INDETERMINATE"] = "INDETERMINATE";
  TransactionStatus2["ERROR"] = "ERROR";
  TransactionStatus2["INVALID_PARAMS"] = "INVALID_PARAMS";
  TransactionStatus2["INVALID_REQUEST"] = "INVALID_REQUEST";
  return TransactionStatus2;
})(TransactionStatus || {});

function isOverridesObject(obj) {
  if (isPlainObject__default["default"](obj)) {
    const overrides = obj;
    if ("gasPrice" in overrides || "gasLimit" in overrides || "value" in overrides || "nonce" in overrides) {
      return true;
    }
  }
  return false;
}

function matchReadCallQuery(_events, _getEventFilter, query, contractAddress, methodName, callArgs) {
  const match = isEqual__default["default"](
    query.queryKey,
    useRead.makeReadCallQueryKey(contractAddress, methodName, callArgs)
  );
  return match;
}

exports.TransactionStatus = TransactionStatus;
exports.isOverridesObject = isOverridesObject;
exports.isTransactionFailedError = isTransactionFailedError;
exports.isTransactionReplacedError = isTransactionReplacedError;
exports.matchReadCallQuery = matchReadCallQuery;
//# sourceMappingURL=index.cjs.js.map
