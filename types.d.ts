import { Contract } from '@ethersproject/contracts';
/**
 * Gets a type for 'callStatic' contract call
 */
export declare type StaticContractCall<TContract extends Contract, TMethodName extends ContractMethodName<TContract>> = TContract['callStatic'][TMethodName];
/**
 * Gets a type for a contract call
 */
export declare type ContractCall<TContract extends Contract, TMethodName extends ContractMethodName<TContract>> = TContract[TMethodName];
/**
 * Gets a type for a estimateGas call
 */
export declare type EstimateGasContractCall<TContract extends Contract, TMethodName extends ContractMethodName<TContract>> = TContract['estimateGas'][TMethodName];
/**
 * Gets a type for a contract query call
 */
export declare type ContractFilterCall<TContract extends Contract, TFilterName extends ContractFilterName<TContract>> = TContract['filters'][TFilterName];
export declare type ContractQueryFilterCall<TContract extends Contract> = TContract['queryFilter'];
/**
 * @type ContractFunctionCall
 * Gets a type for the specific contract call
 */
export declare type ContractFunctionCall<TContract extends Contract, TMethodName extends ContractMethodName<TContract>> = TContract['functions'][TMethodName];
export declare type EstimateGasMethodName<TContract extends Contract> = keyof TContract['estimateGas'];
/**
 *
 * @type ContractMethodName
 * @summary Gets a type for the methods available on a given contract
 */
export declare type ContractMethodName<TContract extends Contract> = keyof TContract['functions'];
export declare type EstimateGasMethodArgs<TContract extends Contract, TMethodName extends EstimateGasMethodName<TContract>> = Parameters<EstimateGasContractCall<TContract, TMethodName>>;
/**
 * Gets a type for the filters available on a given contract
 */
export declare type ContractFilterName<TContract extends Contract> = keyof TContract['filters'];
/**
 * @type ContractReturnType
 * @summary Gets a type for the return type of the given contract call
 */
export declare type ContractReturnType<TContract extends Contract, TMethodName extends ContractMethodName<TContract>> = ReturnType<ContractCall<TContract, TMethodName>>;
/**
 * @type StaticContractReturnType
 */
export declare type StaticContractReturnType<TContract extends Contract, TMethodName extends ContractMethodName<TContract>> = ReturnType<StaticContractCall<TContract, TMethodName>>;
export declare type ContractQueryReturnType<TContract extends Contract> = ReturnType<ContractQueryFilterCall<TContract>>;
/**
 * @type ContractMethodArgs
 *  @summary Gets a type for the call arguments of a given contract and method name
 */
export declare type ContractMethodArgs<TContract extends Contract, TMethodName extends ContractMethodName<TContract>> = Parameters<ContractFunctionCall<TContract, TMethodName>>;
/**
 * @type StaticContractMethodArgs
 */
export declare type StaticContractMethodArgs<TContract extends Contract, TMethodName extends ContractMethodName<TContract>> = Parameters<StaticContractCall<TContract, TMethodName>>;
/**
 * @type ContractFilterArgs
 * @summary  Gets a type for the call arguments of a given contract and method name
 */
export declare type ContractFilterArgs<TContract extends Contract, TFilterName extends ContractFilterName<TContract>> = Parameters<ContractFilterCall<TContract, TFilterName>>;
