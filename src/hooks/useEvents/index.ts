import { QueryObserverResult, useQuery, UseQueryOptions } from 'react-query';

import { Contract, Event } from '@ethersproject/contracts';
import { ContractFilterName, ContractFilterArgs } from 'src/types';

export interface UseEventsCallOptions<
  TContract extends Contract,
  TFilterName extends ContractFilterName<TContract>,
> {
  callArgs?: ContractFilterArgs<TContract, TFilterName>;
  enabled?: boolean;

  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
  fromBlock?: number;
  toBlock?: number;
}

export function useEvents<
  TContract extends Contract,
  TFilterName extends ContractFilterName<TContract>,
>(
  contract: TContract | undefined,
  filterName: TFilterName,
  options?: UseEventsCallOptions<TContract, TFilterName>,
): QueryObserverResult<Event[]> {
  const queryOptions = makeEventsUseQueryOptions<TContract, TFilterName>(
    contract,
    filterName,
    options,
  );

  return useQuery(queryOptions);
}

export function makeEventsUseQueryOptions<
  TContract extends Contract,
  TFilterName extends ContractFilterName<TContract>,
>(
  contract: TContract | undefined,
  filterName: TFilterName,
  options?: UseEventsCallOptions<TContract, TFilterName>,
): UseQueryOptions<Event[]> {
  const {
    enabled = true,
    staleTime,
    cacheTime,
    refetchOnWindowFocus,
    callArgs,
    fromBlock,
    toBlock,
  } = options || {};

  const queryKey = makeEventsQueryKey<TContract, TFilterName>(
    contract,
    filterName,
    callArgs,
    fromBlock,
    toBlock,
  );

  const queryFn = async (): Promise<Event[]> => {
    // this function is not called until contract is defined, so safe to cast.
    const finalContract = contract as TContract;

    const finalArgs = callArgs || [];
    const eventFilter = finalContract.filters[filterName as string](...finalArgs);
    const result = await finalContract.queryFilter(eventFilter, fromBlock, toBlock);
    return result;
  };

  return {
    queryKey,
    queryFn,
    onError: () => {
      console.error(
        // TODO wrapping this expression in 'String(...)'.ts(2731)
        `Error calling ${String(filterName)} on: ${contract?.address} with arguments:`,
        callArgs,
      );
    },
    enabled: !!contract && enabled,
    staleTime,
    cacheTime,
    refetchOnWindowFocus,
  };
}

export function makeEventsQueryKey<
  TContract extends Contract,
  TFilterName extends ContractFilterName<TContract>,
>(
  contract: TContract | undefined,
  filterName: TFilterName,
  callArgs: Parameters<TContract['filters'][TFilterName]> | undefined,
  fromBlock?: number,
  toBlock?: number,
): [
  string,
  TFilterName,
  string | undefined,
  number | undefined,
  number | undefined,
  Parameters<TContract['filters'][TFilterName]> | undefined,
] {
  return ['contractQueryFilter', filterName, contract?.address, fromBlock, toBlock, callArgs];
}
