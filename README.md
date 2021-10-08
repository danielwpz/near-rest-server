# near-rest-server

> Based on Ts.ED framework    
> See [Ts.ED](https://tsed.io) project for more information.

## Build setup

> **Important!** Ts.ED requires Node >= 10, Express >= 4 and TypeScript >= 3.

```batch
# install dependencies
$ npm install

# serve
$ npm run start

# build for production
$ npm run build
$ npm run start:prod
```

## APIs

### - Contract

- Call contract method
  - method: `POST`
  - URL: `/contract/:contract_id/:method_name`
    - `contract_id`: Contract ID(address) e.g. `my-nft.testnet`
    - `method_name`: Method name e.g. `nft_transfer`
  - Body parameters:
    - `account_id`: Caller account id
    - `args`: Method arguments
    - `gas`: gas amount
    - `deposit`: Attached NEAR deposit in yoctoNEAR.

- View contract method
  - method: `GET`
  - URL: `/contract/:contract_id/:method_name`
    - `contract_id`: Contract ID(address) e.g. `my-nft.testnet`
    - `method_name`: Method name e.g. `nft_transfer`
