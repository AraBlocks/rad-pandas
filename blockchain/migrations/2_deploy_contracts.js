const RadPanda = artifacts.require("RadPanda");
const RadPandaFactory = artifacts.require("RadPandaFactory");

module.exports = function (deployer) {
  deployer.deploy(RadPanda);
  deployer.deploy(RadPandaFactory);
};
