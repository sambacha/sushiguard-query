#  rq-sushi

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