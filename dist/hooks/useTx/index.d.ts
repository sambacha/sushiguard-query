import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber } from '@ethersproject/bignumber';
import { ContractReceipt, ContractTransaction, Contract } from '@ethersproject/contracts';
import { UseMutationResult } from 'react-query';
import { TransactionError } from "../../base/TransactionError";
import { TransactionStatus } from "../../base/TransactionStatus";
import { ContractMethodArgs, ContractMethodName } from "../../types";
export interface UseTransactionOptions<TContract extends Contract, TMethodName extends ContractMethodName<TContract>> {
    /**
     * Sets the gas limit on the transaction, overriding anything that was
     * provided when the `mutate` function is called. Useful if you need to buffer
     * the default gas estimate by some amount.
     */
    setGasLimit?: (gasEstimate: BigNumber) => BigNumber;
    onTransactionSubmitted?: (transaction: ContractTransaction, callArgs: ContractMethodArgs<TContract, TMethodName>) => void | Promise<void>;
    onTransactionMined?: (transactionReceipt: ContractReceipt, callArgs: ContractMethodArgs<TContract, TMethodName>, transactionStatus: TransactionStatus) => void | Promise<void>;
    onError?: (error: TransactionError) => void | Promise<void>;
}
declare type UseTransactionResult<TContract extends Contract, TMethodName extends ContractMethodName<TContract>> = UseMutationResult<ContractReceipt | undefined, unknown, ContractMethodArgs<TContract, TMethodName>>;
export declare function useTransaction<TContract extends Contract, TMethodName extends ContractMethodName<TContract>>(contract: TContract | undefined, methodName: TMethodName, signer: Signer | undefined, options?: UseTransactionOptions<TContract, TMethodName>): UseTransactionResult<TContract, TMethodName>;
export {};
