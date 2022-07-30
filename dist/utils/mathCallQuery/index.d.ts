import { Contract } from '@ethersproject/contracts';
import { Query } from 'react-query';
import { ContractMethodName } from "../../types";
/**
 * @export matchReadCallQuery
 * @summary Utility for matching smart contract read call queries when busting the cache.
 */
export declare function matchReadCallQuery<TContract extends Contract, TMethodName extends ContractMethodName<TContract>>(_events: any, _getEventFilter: any, query: Query, contractAddress: string | undefined, methodName: any | TMethodName, callArgs: Parameters<TContract['functions'][TMethodName]> | undefined): boolean;
