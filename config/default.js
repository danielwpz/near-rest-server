const os = require('os');

module.exports = {
  "keyStorePath": `${os.homedir()}/.near-credentials`,
  "network": {
    "id": "testnet",
    "rpc": "https://rpc.testnet.near.org"
  }
}
