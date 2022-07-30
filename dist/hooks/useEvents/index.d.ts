import { QueryObserverResult, UseQueryOptions } from 'react-query';
import { Contract, Event } from '@ethersproject/contracts';
import { ContractFilterName, ContractFilterArgs } from "../../types";
export interface UseEventsCallOptions<TContract extends Contract, TFilterName extends ContractFilterName<TContract>> {
    callArgs?: ContractFilterArgs<TContract, TFilterName>;
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
    refetchOnWindowFocus?: boolean;
    fromBlock?: number;
    toBlock?: number;
}
export declare function useEvents<TContract extends Contract, TFilterName extends ContractFilterName<TContract>>(contract: TContract | undefined, filterName: TFilterName, options?: UseEventsCallOptions<TContract, TFilterName>): QueryObserverResult<Event[]>;
export declare function makeEventsUseQueryOptions<TContract extends Contract, TFilterName extends ContractFilterName<TContract>>(contract: TContract | undefined, filterName: TFilterName, options?: UseEventsCallOptions<TContract, TFilterName>): UseQueryOptions<Event[]>;
export declare function makeEventsQueryKey<TContract extends Contract, TFilterName extends ContractFilterName<TContract>>(contract: TContract | undefined, filterName: TFilterName, callArgs: Parameters<TContract['filters'][TFilterName]> | undefined, fromBlock?: number, toBlock?: number): [
    string,
    TFilterName,
    string | undefined,
    number | undefined,
    number | undefined,
    Parameters<TContract['filters'][TFilterName]> | undefined
];
