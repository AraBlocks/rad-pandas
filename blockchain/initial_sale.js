const opensea = require('opensea-js');
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;

const HDWalletProvider = require('@truffle/hdwallet-provider');
const secrets = require('./secrets.json');

const network = 'live'; // change between 'live' and 'rinkeby' accordingly

const OWNER_ADDRESS = '0x9D582750f758b6A2dC2397669E55A19099AA18ee';
const FACTORY_CONTRACT_ADDRESS = '0xFC940794a7952F6010d73Ff9cd425DED21b60C87';
const NUM_OF_SALES = 10000;
const FIXED_PRICE = 0.04;

let INFURA_URL = '';
if (network === 'rinkeby') {
  INFURA_URL = 'https://rinkeby.infura.io/v3/';
} else {
  INFURA_URL = 'https://mainnet.infura.io/v3/';
}

const provider = new HDWalletProvider(secrets['SEED_PHRASE'], INFURA_URL + secrets['API_KEY']);

const seaport = new OpenSeaPort(
  provider,
  {
    networkName:
      network === 'live'
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
