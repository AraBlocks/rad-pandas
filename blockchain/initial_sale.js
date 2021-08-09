const opensea = require("opensea-js");
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;

const HDWalletProvider = require('@truffle/hdwallet-provider');
const secrets = require('./secrets.json');

const network = "rinkeby"; // change between 'live' and 'rinkeby' accordingly

const OWNER_ADDRESS = "";
const FACTORY_CONTRACT_ADDRESS = "";
const NUM_OF_SALES = 10000;
const FIXED_PRICE = 0.04;

const provider;
if (network === 'rinkeby') {
  provider = new HDWalletProvider(secrets['SEED_PHRASE'], 'https://rinkeby.infura.io/v3/' + secrets['API_KEY']);
} else {
  provider = new HDWalletProvider(secrets['SEED_PHRASE'], 'https://mainnet.infura.io/v3/' + secrets['API_KEY']);
}

const seaport = new OpenSeaPort(
  provider,
  {
    networkName:
      network === "live"
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