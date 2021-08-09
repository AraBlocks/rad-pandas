const RadPanda = artifacts.require("RadPanda");
const RadPandaFactory = artifacts.require("RadPandaFactory");

module.exports = async (deployer, network) => {
  let proxyRegistryAddress = "";
  if (network === 'rinkeby') {
    proxyRegistryAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
  } else {
    proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
  }

  await deployer.deploy(RadPanda, proxyRegistryAddress, {gas: 7000000});
  await deployer.deploy(RadPandaFactory, proxyRegistryAddress, RadPanda.address, {gas: 3000000});

  const radPanda = await RadPanda.deployed();
  await radPanda.transferOwnership(RadPandaFactory.address);
};
