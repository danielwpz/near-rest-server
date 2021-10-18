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

## Accounts
Currently all transactions are signed by accounts from local unencrypted JSON key store just like near-cli.         
You can config the path for keystore folder in `config.keyStorePath`

## APIs

### - Contract

- Call contract method
  - method: `POST`
  - URL: `/contract/:contract_id/:method_name`
    - `contract_id`: Contract ID(address) e.g. `my-nft.testnet`
    - `method_name`: Method name e.g. `nft_transfer`
  - Body parameters:
    - `account_id`: Caller account id. (Account private key will be read from local keyStore folder.)
    - `args`: Method arguments
    - `gas`: gas amount
    - `deposit`: Attached NEAR deposit in yoctoNEAR.

- View contract method
  - method: `GET`
  - URL: `/contract/:contract_id/:method_name`
    - `contract_id`: Contract ID(address) e.g. `my-nft.testnet`
    - `method_name`: Method name e.g. `nft_transfer`
