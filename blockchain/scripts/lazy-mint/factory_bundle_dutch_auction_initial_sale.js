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
  // Example: many declining Dutch auction for a factory.
  console.log("Creating dutch auctions...");

  // Expire one day from now
  const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24);
  const dutchSellOrders = await seaport.createFactorySellOrders({
    assets: [
      {
        tokenId: DUTCH_AUCTION_OPTION_ID,
        tokenAddress: FACTORY_CONTRACT_ADDRESS,
      },
    ],
    accountAddress: OWNER_ADDRESS,
    startAmount: DUTCH_AUCTION_START_AMOUNT,
    endAmount: DUTCH_AUCTION_END_AMOUNT,
    expirationTime: expirationTime,
    numberOfOrders: NUM_DUTCH_AUCTIONS,
  });
  console.log(
    `Successfully made ${dutchSellOrders.length} Dutch-auction sell orders! ${dutchSellOrders[0].asset.openseaLink}\n`
  );
}

main();
