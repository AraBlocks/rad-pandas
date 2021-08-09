const opensea = require('opensea-js');
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;

const HDWalletProvider = require('@truffle/hdwallet-provider');
const secrets = require('./secrets.json');

const network = 'rinkeby'; // change between 'live' and 'rinkeby' accordingly

const OWNER_ADDRESS = '0x88c055b85751448f3013378544ad463b2542f099';
const FACTORY_CONTRACT_ADDRESS = '0x83d34e89881b5b49ba16fbc3d297103deb94fcc0';
const NUM_OF_SALES = 9998;
const FIXED_PRICE = 0.04;

const INFURA_URL = '';
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
        : Network.Rinkeby
  },
  (arg) => console.log(arg)
);

async function main() {
  const sellOrders = await seaport.createFactorySellOrders({
    assetId: 0,
    factoryAddress: FACTORY_CONTRACT_ADDRESS,
    accountAddress: OWNER_ADDRESS,
    startAmount: FIXED_PRICE,
    numberOfOrders: NUM_OF_SALES
  })
}

main();