import { Contract } from '@ethersproject/contracts';

/**
 * Gets a type for 'callStatic' contract call
 */
export type StaticContractCall<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
> = TContract['callStatic'][TMethodName];

/**
 * Gets a type for a contract call
 */
export type ContractCall<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
> = TContract[TMethodName];

/**
 * Gets a type for a estimateGas call
 */
export type EstimateGasContractCall<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
> = TContract['estimateGas'][TMethodName];

/**
 * Gets a type for a contract query call
 */
export type ContractFilterCall<
  TContract extends Contract,
  TFilterName extends ContractFilterName<TContract>,
> = TContract['filters'][TFilterName];

export type ContractQueryFilterCall<TContract extends Contract> = TContract['queryFilter'];
/**
 * @type ContractFunctionCall
 * Gets a type for the specific contract call
 */
export type ContractFunctionCall<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
> = TContract['functions'][TMethodName];

export type EstimateGasMethodName<TContract extends Contract> = keyof TContract['estimateGas'];

/**
 * 
 * @type ContractMethodName
 * @summary Gets a type for the methods available on a given contract
 */
export type ContractMethodName<TContract extends Contract> = keyof TContract['functions'];

export type EstimateGasMethodArgs<
  TContract extends Contract,
  TMethodName extends EstimateGasMethodName<TContract>,
> = Parameters<EstimateGasContractCall<TContract, TMethodName>>;
/**
 * Gets a type for the filters available on a given contract
 */
export type ContractFilterName<TContract extends Contract> = keyof TContract['filters'];

/**
 * @type ContractReturnType
 * @summary Gets a type for the return type of the given contract call
 */
export type ContractReturnType<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
> = ReturnType<ContractCall<TContract, TMethodName>>;

/**
 * @type StaticContractReturnType
 */
export type StaticContractReturnType<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
> = ReturnType<StaticContractCall<TContract, TMethodName>>;

export type ContractQueryReturnType<TContract extends Contract> = ReturnType<
  ContractQueryFilterCall<TContract>
>;

/**
 * @type ContractMethodArgs
 *  @summary Gets a type for the call arguments of a given contract and method name
 */
export type ContractMethodArgs<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
> = Parameters<ContractFunctionCall<TContract, TMethodName>>;

/**
 * @type StaticContractMethodArgs
 */
export type StaticContractMethodArgs<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
> = Parameters<StaticContractCall<TContract, TMethodName>>;

/**
 * @type ContractFilterArgs
 * @summary  Gets a type for the call arguments of a given contract and method name
 */
export type ContractFilterArgs<
  TContract extends Contract,
  TFilterName extends ContractFilterName<TContract>,
> = Parameters<ContractFilterCall<TContract, TFilterName>>;
