const RadPanda = artifacts.require("RadPanda");
const RadPandaFactory = artifacts.require("RadPandaFactory");

const numTokens = 25;
const initialMintAddress = "0x9da6382Fa5EE8c8ec691F56764B017D8EE57C9d9";

module.exports = async (deployer, network) => {
  let proxyRegistryAddress = "";
  if (network === 'rinkeby') {
    proxyRegistryAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
  } else {
    proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
  }

  await deployer.deploy(RadPanda, proxyRegistryAddress, numTokens, initialMintAddress, {gas: 7000000});
  await deployer.deploy(RadPandaFactory, proxyRegistryAddress, RadPanda.address, {gas: 3000000});

  const radPanda = await RadPanda.deployed();
  await radPanda.transferOwnership(RadPandaFactory.address);
};
