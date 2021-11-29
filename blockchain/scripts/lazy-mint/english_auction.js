const opensea = require("opensea-js");
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;

const secrets = require('../../secrets.json');
const FACTORY_CONTRACT_ADDRESS = secrets['FACTORY_CONTRACT_ADDRESS'];
const NFT_CONTRACT_ADDRESS = secrets['NFT_CONTRACT_ADDRESS'];
const OWNER_ADDRESS = secrets['OWNER_ADDRESS'];
const NETWORK = secrets['NETWORK']; // change between 'live' and 'rinkeby' accordingly
const OPENSEA_API_KEY = secrets['OPENSEA_API_KEY'] || ""; // API key is optional but useful if you're doing a high volume of requests.
const INFURA_KEY = secrets['INFURA_KEY']
if (!INFURA_KEY || !NETWORK || !OWNER_ADDRESS || !OPENSEA_API_KEY) {
  console.error(
    "Please set a Infura key, owner, network and API key."
  );
  return;
}

if (!FACTORY_CONTRACT_ADDRESS && !NFT_CONTRACT_ADDRESS) {
  console.error("Please either set a factory or NFT contract address.");
  return;
}

let INFURA_URL = '';
if (NETWORK === 'rinkeby') {
  INFURA_URL = 'wss://rinkeby.infura.io/ws/v3/';
} else {
  INFURA_URL = 'wss://mainnet.infura.io/ws/v3/';
}

const provider = new HDWalletProvider(secrets['SEED_PHRASE'], INFURA_URL + INFURA_KEY);

const seaport = new OpenSeaPort(
  provider,
  {
    networkName:
      NETWORK === "mainnet" || NETWORK === "live"
        ? Network.Main
        : Network.Rinkeby,
    apiKey: OPENSEA_API_KEY,
  },
  (arg) => console.log(arg)
);

async function main() {
  console.log("English auctioning an item in DAI...");
  const wethAddress =
    NETWORK === "mainnet" || NETWORK === "live"
      ? "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
      : "0xc778417e063141139fce010982780140aa0cd5ab";
  const englishAuctionSellOrder = await seaport.createSellOrder({
    asset: {
      tokenId: "3",
      tokenAddress: NFT_CONTRACT_ADDRESS,
    },
    startAmount: 0.03,
    expirationTime: expirationTime,
    waitForHighestBid: true,
    paymentTokenAddress: wethAddress,
    accountAddress: OWNER_ADDRESS,
  });
  console.log(
    `Successfully created an English auction sell order! ${englishAuctionSellOrder.asset.openseaLink}\n`
  );
}

main();
