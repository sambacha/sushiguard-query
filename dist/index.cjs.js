'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var logger = require('@ethersproject/logger');
var isPlainObject = require('lodash.isplainobject');
var isEqual = require('lodash.isequal');
require('react-query');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isPlainObject__default = /*#__PURE__*/_interopDefaultLegacy(isPlainObject);
var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);

function isTransactionReplacedError(error) {
    if (error.code === logger.Logger.errors.TRANSACTION_REPLACED) {
        return true;
    }
    return false;
}
// TODO: Fix this ErrorType
function isTransactionFailedError(error) {
    // 'Server error: Invalid input, unable to locate canonical block',
    if (error?.message?.includes('-32000')) {
        return true;
    }
    return false;
}

/**
 * TODO
 */
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
        const overrides = obj;
        if ('gasPrice' in overrides ||
            'gasLimit' in overrides ||
            'value' in overrides ||
            'nonce' in overrides) {
            return true;
        }
    }
    return false;
}

/**
 * @description Make Read Call Query by Key
 * @export makeReadCallQueryKey
 * @template TContract
 * @template TMethodName
 * @param {(string | undefined)} contractAddress
 * @param {TMethodName} methodName
 * @param {(Parameters<TContract['functions'][TMethodName]> | undefined)} callArgs
 * @returns {*}  {([
 *   string,
 *   TMethodName,
 *   string | undefined,
 *   {
 *     callArgs: Parameters<TContract['functions'][TMethodName]> | undefined;
 *   },
 * ])}
 */
function makeReadCallQueryKey(contractAddress, methodName, callArgs) {
    return ['contractCall', methodName, contractAddress, { callArgs }];
}

/**
 * @export matchReadCallQuery
 * @summary Utility for matching smart contract read call queries when busting the cache.
 */
function matchReadCallQuery(
//  estimate: any,
// addressPromise: any,
_events, _getEventFilter, 
//   addListener: any,
query, contractAddress, methodName, callArgs) {
    // @note Don't Inline
    const match = isEqual__default["default"](query.queryKey, makeReadCallQueryKey(contractAddress, methodName, callArgs));
    return match;
}

exports.isOverridesObject = isOverridesObject;
exports.isTransactionFailedError = isTransactionFailedError;
exports.isTransactionReplacedError = isTransactionReplacedError;
exports.matchReadCallQuery = matchReadCallQuery;
//# sourceMappingURL=index.cjs.js.map
