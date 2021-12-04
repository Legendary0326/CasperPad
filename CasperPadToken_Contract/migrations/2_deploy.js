const cspdToken = artifacts.require("CSPDToken");
const vesting = artifacts.require("Vesting");

module.exports = async function (deployer, network, addresses) {
  

  if(network === 'development') {
    await deployer.deploy(cspdToken);
    const tokenInstance = await cspdToken.deployed();
    await deployer.deploy(vesting, tokenInstance.address);
    const vestingInstance = await vesting.deployed();
  } else {

  }
};
