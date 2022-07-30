import { Logger } from '@ethersproject/logger';
import isPlainObject from 'lodash.isplainobject';
import isEqual from 'lodash.isequal';
import { makeReadCallQueryKey } from 'src/hooks/useRead';

function isTransactionReplacedError(error) {
  if (error.code === Logger.errors.TRANSACTION_REPLACED) {
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
  if (isPlainObject(obj)) {
    const overrides = obj;
    if ("gasPrice" in overrides || "gasLimit" in overrides || "value" in overrides || "nonce" in overrides) {
      return true;
    }
  }
  return false;
}

function matchReadCallQuery(_events, _getEventFilter, query, contractAddress, methodName, callArgs) {
  const match = isEqual(
    query.queryKey,
    makeReadCallQueryKey(contractAddress, methodName, callArgs)
  );
  return match;
}

export { TransactionStatus, isOverridesObject, isTransactionFailedError, isTransactionReplacedError, matchReadCallQuery };
//# sourceMappingURL=index.cjs.mjs.map
