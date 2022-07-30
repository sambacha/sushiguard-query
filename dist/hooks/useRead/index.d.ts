import { Contract } from '@ethersproject/contracts';
import { QueryObserverResult, UseQueryOptions } from 'react-query';
import { Unpacked } from "../../base/Unpacked";
import { ContractMethodArgs, ContractMethodName, StaticContractReturnType } from "../../types";
export interface UseReadCallOptions<TContract extends Contract, TMethodName extends ContractMethodName<TContract>, TReturnType extends Unpacked<StaticContractReturnType<TContract, TMethodName>>, TSelect = TReturnType> {
    callArgs?: ContractMethodArgs<TContract, TMethodName>;
    enabled?: boolean;
    staleTime?: number;
    keepPreviousData?: boolean;
    select?: (data: TReturnType) => TSelect;
}
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
export declare function useReadCall<TContract extends Contract, TMethodName extends ContractMethodName<TContract>, TContractData extends Unpacked<StaticContractReturnType<TContract, TMethodName>>, TData = TContractData>(contract: TContract | undefined, methodName: TMethodName, options?: UseReadCallOptions<TContract, TMethodName, TContractData, TData>): QueryObserverResult<TData>;
export declare function makeReadCallUseQueryOptions<TContract extends Contract, TMethodName extends ContractMethodName<TContract>, TContractData extends Unpacked<StaticContractReturnType<TContract, TMethodName>>, TData = TContractData>(contract: TContract | undefined, methodName: TMethodName, options?: UseReadCallOptions<TContract, TMethodName, TContractData, TData>): UseQueryOptions<TContractData, unknown, TData>;
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
export declare function makeReadCallQueryKey<TContract extends Contract, TMethodName extends ContractMethodName<TContract>>(contractAddress: string | undefined, methodName: TMethodName, callArgs: Parameters<TContract['functions'][TMethodName]> | undefined): [
    string,
    TMethodName,
    string | undefined,
    {
        callArgs: Parameters<TContract['functions'][TMethodName]> | undefined;
    }
];
