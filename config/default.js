const os = require('os');

module.exports = {
  "keyStorePath": `${os.homedir()}/.near-credentials`,
  "networkConfig": {
    "mainnet": {
      "id": "mainnet",
      "rpc": "https://public-rpc.blockpi.io/http/near"
    },
    "testnet": {
      "id": "testnet",
      "rpc": "https://rpc.testnet.near.org"
    }
  }
}
