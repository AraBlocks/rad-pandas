const HDWalletProvider = require('@truffle/hdwallet-provider');
const secrets = require('./secrets.json');

module.exports = {
  networks: {
    dev: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ganache port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    rinkeby: {
      provider: () => new HDWalletProvider(secrets['SEED_PHRASE'], 'https://rinkeby.infura.io/v3/' + secrets['API_KEY']),
      network_id: 4,       // Rinkeby's id
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    live: {
      provider: () => new HDWalletProvider(secrets['SEED_PHRASE'], 'https://mainnet.infura.io/v3/' + secrets['API_KEY']),
      network_id: 1,    // Mainnet id
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.0",    // Fetch version from solc-bin (default: truffle's version)
    }
  }
};
