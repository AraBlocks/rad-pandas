const opensea = require('opensea-js');
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;
const HDWalletProvider = require('@truffle/hdwallet-provider');

const secrets = require('../../secrets.json');
const NETWORK = secrets['NETWORK']; // change between 'live' and 'rinkeby' accordingly
const OWNER_ADDRESS = secrets['OWNER_ADDRESS'];
const FACTORY_CONTRACT_ADDRESS = secrets['FACTORY_CONTRACT_ADDRESS'];
const NUM_OF_SALES = 10000;
const FIXED_PRICE = 0.04;

let INFURA_URL = '';
if (NETWORK === 'rinkeby') {
  INFURA_URL = 'wss://rinkeby.infura.io/ws/v3/';
} else {
  INFURA_URL = 'wss://mainnet.infura.io/ws/v3/';
}

const provider = new HDWalletProvider(secrets['SEED_PHRASE'], INFURA_URL + secrets['INFURA_KEY']);

const seaport = new OpenSeaPort(
  provider,
  {
    networkName:
      NETWORK === 'live'
        ? Network.Main
        : Network.Rinkeby,
    apiKey: secrets['OPENSEA_API_KEY']
  },
  (arg) => console.log(arg)
);

async function main() {
  const sellOrders = await seaport.createFactorySellOrders({
    assets: [
      {
        tokenId: 0,
        tokenAddress: FACTORY_CONTRACT_ADDRESS
      }
    ],
    accountAddress: OWNER_ADDRESS,
    startAmount: FIXED_PRICE,
    numberOfOrders: NUM_OF_SALES
  })
}

main();
