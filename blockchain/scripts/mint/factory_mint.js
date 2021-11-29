const HDWalletProvider = require('@truffle/hdwallet-provider');
const web3 = require("web3");

const secrets = require('../../secrets.json');
const NETWORK = secrets['NETWORK']; // change between 'live' and 'rinkeby' accordingly
const OWNER_ADDRESS = secrets['OWNER_ADDRESS'];
const FACTORY_CONTRACT_ADDRESS = secrets['FACTORY_CONTRACT_ADDRESS'];
const NUM_CREATURES = 12;

if (!OWNER_ADDRESS || !NETWORK) {
  console.error(
    "Please set a mnemonic, Infura key, owner, network.."
  );
  return;
}

const FACTORY_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_optionId",
        type: "uint256",
      },
      {
        name: "_toAddress",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

let INFURA_URL = '';
if (NETWORK === 'rinkeby') {
  INFURA_URL = 'wss://rinkeby.infura.io/ws/v3/';
} else {
  INFURA_URL = 'wss://mainnet.infura.io/ws/v3/';
}

const provider = new HDWalletProvider(secrets['SEED_PHRASE'], INFURA_URL + secrets['INFURA_KEY']);

const web3Instance = new web3(provider);

async function main() {
  if (FACTORY_CONTRACT_ADDRESS) {
    const factoryContract = new web3Instance.eth.Contract(
      FACTORY_ABI,
      FACTORY_CONTRACT_ADDRESS,
      { gasLimit: "1000000" }
    );

    // Creatures issued directly to the owner.
    for (var i = 0; i < NUM_CREATURES; i++) {
      const result = await factoryContract.methods
        .mint(DEFAULT_OPTION_ID, OWNER_ADDRESS)
        .send({ from: OWNER_ADDRESS });
      console.log("Minted creature. Transaction: " + result.transactionHash);
    }
  } else {
    console.error(
      "Add NFT_CONTRACT_ADDRESS or FACTORY_CONTRACT_ADDRESS to the environment variables"
    );
  }
}

main();
