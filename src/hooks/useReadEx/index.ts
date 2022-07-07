import { Contract } from '@ethersproject/contracts';
import isPlainObject from 'lodash.isplainobject';
import zip from 'lodash.zip';
import { QueryObserverResult, useQueries, UseQueryOptions } from 'react-query';
import { makeReadCallUseQueryOptions, UseReadCallOptions } from 'src/hooks/useRead';
import { ContractMethodName, StaticContractReturnType } from 'src/types';
import { Unpacked } from 'src/base/Unpacked';


export function useReadEx<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract> = ContractMethodName<TContract>,
  TContractData extends Unpacked<StaticContractReturnType<TContract, TMethodName>> = Unpacked<
    StaticContractReturnType<TContract, TMethodName>
  >,
  TData = TContractData,
>(
  contracts: (TContract | undefined)[],
  methodName: TMethodName,
  options?:
    | (UseReadCallOptions<TContract, TMethodName, TContractData, TData> | undefined)[]
    | UseReadCallOptions<TContract, TMethodName, TContractData, TData>,
): QueryObserverResult<TContractData>[] {
  let optionsArray: (
    | UseReadCallOptions<TContract, TMethodName, TContractData, TData>
    | undefined
  )[] = [];

  if (!options || isPlainObject(options)) {
    optionsArray = contracts.map(() => options) as (
      | UseReadCallOptions<TContract, TMethodName, TContractData, TData>
      | undefined
    )[];
  } else if (options && Array.isArray(options)) {
    optionsArray = options;
  }

  
  const queryOptions = zip(contracts, optionsArray).map(([contract, options]) =>
    makeReadCallUseQueryOptions(contract, methodName, options),
  );

  // Cast this to unkown when calling useQueries, because useQueries does not
  // yet support generics and string and unknown are incompatible types.
  const queryResult = useQueries(
    queryOptions as UseQueryOptions<unknown, unknown, unknown>[],
  ) as QueryObserverResult<TContractData, unknown>[];

  return queryResult;
}
