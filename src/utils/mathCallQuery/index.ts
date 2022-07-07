import { Contract } from '@ethersproject/contracts';
import { Query } from 'react-query';
import isEqual from 'lodash.isequal';
import { ContractMethodName } from 'src/types';
import { makeReadCallQueryKey } from 'src/hooks/useRead';

/**
 * @export matchReadCallQuery
 * @summary Utility for matching smart contract read call queries when busting the cache.
 */
export function matchReadCallQuery<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
>(
  //  estimate: any,
  // addressPromise: any,
  _events: any,
  _getEventFilter: any,
  //   addListener: any,
  query: Query,
  contractAddress: string | undefined,
  methodName: any | TMethodName,
  callArgs: Parameters<TContract['functions'][TMethodName]> | undefined,
): boolean {
  // @note Don't Inline
  const match = isEqual(
    query.queryKey,
    makeReadCallQueryKey(contractAddress, methodName, callArgs),
  );
  return match;
}
