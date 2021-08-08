const RadPanda = artifacts.require("RadPanda");
const RadPandaFactory = artifacts.require("RadPandaFactory");

const numTokens = 25;
const initialMintAddress = "";

module.exports = function (deployer) {
  let proxyRegistryAddress = "";
  if (network === 'rinkeby') {
    proxyRegistryAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
  } else {
    proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
  }

  deployer.deploy(RadPanda, proxyRegistryAddress, numTokens, initialMintAddress);
  deployer.deploy(RadPandaFactory, proxyRegistryAddress, RadPanda.address);

  const RadPanda = await RadPanda.deployed();
  await RadPanda.transferOwnership(RadPandaFactory.address);
};
