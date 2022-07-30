import { Contract, ContractReceipt, Overrides } from '@ethersproject/contracts';
import { ContractTransaction } from 'ethers';
import { Query } from 'react-query';
import { ContractMethodName as ContractMethodName$1 } from 'src/types';

/**
 * Gets a type for 'callStatic' contract call
 */
declare type StaticContractCall<TContract extends Contract, TMethodName extends ContractMethodName<TContract>> = TContract['callStatic'][TMethodName];
/**
 * Gets a type for a contract call
 */
declare type ContractCall<TContract extends Contract, TMethodName extends ContractMethodName<TContract>> = TContract[TMethodName];
/**
 * Gets a type for a estimateGas call
 */
declare type EstimateGasContractCall<TContract extends Contract, TMethodName extends ContractMethodName<TContract>> = TContract['estimateGas'][TMethodName];
/**
 * Gets a type for a contract query call
 */
declare type ContractFilterCall<TContract extends Contract, TFilterName extends ContractFilterName<TContract>> = TContract['filters'][TFilterName];
declare type ContractQueryFilterCall<TContract extends Contract> = TContract['queryFilter'];
/**
 * @type ContractFunctionCall
 * Gets a type for the specific contract call
 */
declare type ContractFunctionCall<TContract extends Contract, TMethodName extends ContractMethodName<TContract>> = TContract['functions'][TMethodName];
declare type EstimateGasMethodName<TContract extends Contract> = keyof TContract['estimateGas'];
/**
 *
 * @type ContractMethodName
 * @summary Gets a type for the methods available on a given contract
 */
declare type ContractMethodName<TContract extends Contract> = keyof TContract['functions'];
declare type EstimateGasMethodArgs<TContract extends Contract, TMethodName extends EstimateGasMethodName<TContract>> = Parameters<EstimateGasContractCall<TContract, TMethodName>>;
/**
 * Gets a type for the filters available on a given contract
 */
declare type ContractFilterName<TContract extends Contract> = keyof TContract['filters'];
/**
 * @type ContractReturnType
 * @summary Gets a type for the return type of the given contract call
 */
declare type ContractReturnType<TContract extends Contract, TMethodName extends ContractMethodName<TContract>> = ReturnType<ContractCall<TContract, TMethodName>>;
/**
 * @type StaticContractReturnType
 */
declare type StaticContractReturnType<TContract extends Contract, TMethodName extends ContractMethodName<TContract>> = ReturnType<StaticContractCall<TContract, TMethodName>>;
declare type ContractQueryReturnType<TContract extends Contract> = ReturnType<ContractQueryFilterCall<TContract>>;
/**
 * @type ContractMethodArgs
 *  @summary Gets a type for the call arguments of a given contract and method name
 */
declare type ContractMethodArgs<TContract extends Contract, TMethodName extends ContractMethodName<TContract>> = Parameters<ContractFunctionCall<TContract, TMethodName>>;
/**
 * @type StaticContractMethodArgs
 */
declare type StaticContractMethodArgs<TContract extends Contract, TMethodName extends ContractMethodName<TContract>> = Parameters<StaticContractCall<TContract, TMethodName>>;
/**
 * @type ContractFilterArgs
 * @summary  Gets a type for the call arguments of a given contract and method name
 */
declare type ContractFilterArgs<TContract extends Contract, TFilterName extends ContractFilterName<TContract>> = Parameters<ContractFilterCall<TContract, TFilterName>>;

declare type TransactionError = TransactionReplacedError | TransactionFailedError;
interface TransactionReplacedError extends Error {
    code: 'TRANSACTION_REPLACED';
    reason: 'repriced' | 'cancelled' | 'replaced';
    cancelled: boolean;
    replacement: ContractTransaction;
    receipt: ContractReceipt;
}
declare function isTransactionReplacedError(error: TransactionError): error is TransactionReplacedError;
interface TransactionFailedError {
    code: number;
    message: string;
    stack: string;
}
declare function isTransactionFailedError(error: TransactionError): error is TransactionError;

/**
 * TODO
 */
declare enum TransactionStatus {
    SUBMITTED = "SUBMITTED",
    REPRICED = "REPRICED",
    CANCELLED = "CANCELLED",
    MINED = "MINED",
    UNCHECKED = "UNCHECKED",
    PROCESSING = "PROCESSING",
    OK = "OK",
    INDETERMINATE = "INDETERMINATE",
    ERROR = "ERROR",
    INVALID_PARAMS = "INVALID_PARAMS",
    INVALID_REQUEST = "INVALID_REQUEST"
}

/**
 * @export
 * @type Unpacked
 * @summary  Gets the data type for the return value of a promise
 */
declare type Unpacked<T> = T extends (infer U)[] ? U : T extends (...args: any[]) => infer U ? U : T extends Promise<infer U> ? U : T;

declare function isOverridesObject(obj: any): obj is Overrides;

/**
 * @export matchReadCallQuery
 * @summary Utility for matching smart contract read call queries when busting the cache.
 */
declare function matchReadCallQuery<TContract extends Contract, TMethodName extends ContractMethodName$1<TContract>>(_events: any, _getEventFilter: any, query: Query, contractAddress: string | undefined, methodName: any | TMethodName, callArgs: Parameters<TContract['functions'][TMethodName]> | undefined): boolean;

export { ContractCall, ContractFilterArgs, ContractFilterCall, ContractFilterName, ContractFunctionCall, ContractMethodArgs, ContractMethodName, ContractQueryFilterCall, ContractQueryReturnType, ContractReturnType, EstimateGasContractCall, EstimateGasMethodArgs, EstimateGasMethodName, StaticContractCall, StaticContractMethodArgs, StaticContractReturnType, TransactionError, TransactionFailedError, TransactionReplacedError, TransactionStatus, Unpacked, isOverridesObject, isTransactionFailedError, isTransactionReplacedError, matchReadCallQuery };
