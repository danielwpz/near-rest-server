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
# NOTE: currently smart contract panic messages won't be returned in prod mode
$ npm run build
$ npm run start:prod
```

## NEAR Accounts
Currently all transactions are signed by accounts from local unencrypted JSON key store (by default `~/.near-credentials`) just like near-cli.         
You can config the path for keystore folder in `config.keyStorePath`

## APIs

### - General Contracts

- Call contract method
  - method: `POST`
  - URL: `/:network_id/contract/:contract_id/:method_name`
    - `network_id`: `mainnet` or `testnet`
    - `contract_id`: Contract ID(address) e.g. `my-nft.testnet`
    - `method_name`: Method name e.g. `nft_transfer`
  - Body parameters:
    - `account_id`: Caller account id. (Account private key will be read from local keyStore folder.)
    - `args`: Method arguments
    - `gas`: Gas amount (e.g. `300 Tgas`, `1 Ggas`), see [near-units](https://github.com/near/units-js)
    - `deposit`: Attached NEAR deposit (e.g. `10N`, `1yN`), see [near-units](https://github.com/near/units-js)

- View contract method
  - method: `GET`
  - URL: `/:network_id/contract/:contract_id/:method_name`
    - `network_id`: `mainnet` or `testnet`
    - `contract_id`: Contract ID(address) e.g. `my-nft.testnet`
    - `method_name`: Method name e.g. `nft_transfer`
  - parameters:
    - view args can be provided through either JSON body or url query.
    - If body is provided, url query will be ignored.

### - NEP Contracts

#### NEP171
- `GET` `/:network_id/nep171/:contract_id/nft_token`
  - Get one NFT
  - Query Params
    - `token_id`: token id

- `POST` `/:network_id/nep171/:contract_id/nft_transfer`
  - Transfer an NFT
  - Body Params
    - `*account_id`: calling account id
    - `*deposit`: deposit, MUST be `1yN`
    - `args`
      - `*receiver_id`: receiver id
      - `*token_id`: token id
      - `approval_id`: approval id
      - `memo`: memo string

## Contribute

### NEP Standards
To add new endpoints for any NEP standards. You can take `neps/nep171.ts` as an example.      
1. Create a new file named by NEP standard (e.g. `nep141.ts`) in neps folder.      
2. Export a dictionary of NEP type, which should describe the standard name, view methods and change methods.    
3. For each view/change method, define its name and call arguments.
