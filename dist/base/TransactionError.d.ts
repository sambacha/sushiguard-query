import { ContractTransaction } from 'ethers';
import { ContractReceipt } from '@ethersproject/contracts';
export declare type TransactionError = TransactionReplacedError | TransactionFailedError;
export interface TransactionReplacedError extends Error {
    code: 'TRANSACTION_REPLACED';
    reason: 'repriced' | 'cancelled' | 'replaced';
    cancelled: boolean;
    replacement: ContractTransaction;
    receipt: ContractReceipt;
}
export declare function isTransactionReplacedError(error: TransactionError): error is TransactionReplacedError;
export interface TransactionFailedError {
    code: number;
    message: string;
    stack: string;
}
export declare function isTransactionFailedError(error: TransactionError): error is TransactionError;
