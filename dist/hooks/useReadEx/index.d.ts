import { Contract } from '@ethersproject/contracts';
import { QueryObserverResult } from 'react-query';
import { UseReadCallOptions } from "../useRead";
import { ContractMethodName, StaticContractReturnType } from "../../types";
import { Unpacked } from "../../base/Unpacked";
export declare function useReadEx<TContract extends Contract, TMethodName extends ContractMethodName<TContract> = ContractMethodName<TContract>, TContractData extends Unpacked<StaticContractReturnType<TContract, TMethodName>> = Unpacked<StaticContractReturnType<TContract, TMethodName>>, TData = TContractData>(contracts: (TContract | undefined)[], methodName: TMethodName, options?: (UseReadCallOptions<TContract, TMethodName, TContractData, TData> | undefined)[] | UseReadCallOptions<TContract, TMethodName, TContractData, TData>): QueryObserverResult<TContractData>[];
