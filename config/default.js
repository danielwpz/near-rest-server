const os = require('os');

module.exports = {
  "keyStorePath": `${os.homedir()}/.near-credentials`,
  "networkConfig": {
    "mainnet": {
      "id": "mainnet",
      "rpc": "https://rpc.mainnet.near.org"
    },
    "testnet": {
      "id": "testnet",
      "rpc": "https://rpc.testnet.near.org"
    }
  }
}
