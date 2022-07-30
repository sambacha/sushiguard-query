import { Contract, Event } from '@ethersproject/contracts';
import { QueryObserverResult, useQuery, UseQueryOptions } from 'react-query';
import { Unpacked } from 'src/base/Unpacked';
import { ContractMethodArgs, ContractMethodName, StaticContractReturnType } from 'src/types';

//   Type 'Contract' is missing the following properties from type 'Contract': callStatic, estimateGas, populateTransaction, resolvedAddress, and 8 more.ts(2344)

export interface UseReadCallOptions<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
  TReturnType extends Unpacked<StaticContractReturnType<TContract, TMethodName>>,
  TSelect = TReturnType,
> {
  callArgs?: ContractMethodArgs<TContract, TMethodName>;
  enabled?: boolean;
  staleTime?: number;

  keepPreviousData?: boolean;
  select?: (data: TReturnType) => TSelect;
}

const AUTH_PAL_FN = (v: unknown) => v;
/**
 * @description Make a contract read and query results
 * @export useReadCall
 * @template TContract
 * @template TMethodName
 * @template TContractData
 * @template TData
 * @param {(TContract | undefined)} contract
 * @param {TMethodName} methodName
 * @param {UseReadCallOptions<TContract, TMethodName, TContractData, TData>} [options]
 * @returns {*}  {QueryObserverResult<TData>}
 */
export function useReadCall<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
  TContractData extends Unpacked<StaticContractReturnType<TContract, TMethodName>>,
  TData = TContractData,
>(
  contract: TContract | undefined,
  methodName: TMethodName,
  options?: UseReadCallOptions<TContract, TMethodName, TContractData, TData>,
): QueryObserverResult<TData> {
  const queryOptions = makeReadCallUseQueryOptions(contract, methodName, options);

  const queryResult = useQuery(queryOptions);

  return queryResult;
}

export function makeReadCallUseQueryOptions<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
  TContractData extends Unpacked<StaticContractReturnType<TContract, TMethodName>>,
  TData = TContractData,
>(
  contract: TContract | undefined,
  methodName: TMethodName,
  options?: UseReadCallOptions<TContract, TMethodName, TContractData, TData>,
): UseQueryOptions<TContractData, unknown, TData> {
  const { enabled = true, callArgs, staleTime, select, keepPreviousData } = options || {};

  const queryKey = makeReadCallQueryKey<TContract, TMethodName>(
    contract?.address,
    methodName,
    callArgs,
  );

  /**
   *
   * @const queryFn
   * @return {*}  {Promise<TContractData>}
   */
  const queryFn = async (): Promise<TContractData> => {
    const finalArgs = callArgs || [];

    /**
     *
     * @const result
     * @summary Ensure that all calls use the static method explicitly
     *
     */
    const result = await contract?.callStatic?.[methodName as string](...finalArgs);
    return result;
  };

  const queryOptions: UseQueryOptions<TContractData, unknown, TData> = {
    queryKey,
    queryFn,
    onError: () => {
      console.error(`Error calling methodName on ${contract?.address} with arguments:`, callArgs);
    },
    select: select || (AUTH_PAL_FN as (v: TContractData) => TData),
    keepPreviousData,
    staleTime,
    enabled: !!contract && enabled,
  };

  return queryOptions;
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
export function makeReadCallQueryKey<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
>(
  contractAddress: string | undefined,
  methodName: TMethodName,
  callArgs: Parameters<TContract['functions'][TMethodName]> | undefined,
): [
  string,
  TMethodName,
  string | undefined,
  {
    callArgs: Parameters<TContract['functions'][TMethodName]> | undefined;
  },
] {
  return ['contractCall', methodName, contractAddress, { callArgs }];
}
