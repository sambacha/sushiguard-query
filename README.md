#  rq-sushi

> Based off of Uniswap Redux Multicall 

[see https://github.com/sushiswap/sushiswap/blob/master/apps/swap/lib/state/multicall.ts](https://github.com/sushiswap/sushiswap/blob/master/apps/swap/lib/state/multicall.ts)

## Example: calling the same method on a list of contracts.

Basic:
 
 ```typescript
  const contracts = [wethContract, usdcContract];
  const [{ data: wethSymbol }, { data: usdcSymbol }] = useReadEx(
    contracts,
    "symbol"
  );
  ```
 
  Example with call args:
 
  ```typescript
  const [
    { data: wethMarket },
    { data: usdcMarket },
  ] = useReadEx(contracts, "getSpotPrice", [
    { callArgs: ["0xSomeToken"] },
    { callArgs: ["0xAnotherToken"] },
  ]);
```
