var DappToken = artifacts.require("./DappToken.sol");
var DappTokenSale = artifacts.require("./DappTokenSale.sol");

module.exports = function(deployer) {
  deployer.deploy(DappToken, 1000000).then(function() {
    // Token price is 0.001 Ether
    var tokenPrice = 1000000000000000;
    return deployer.deploy(DappTokenSale, DappToken.address, tokenPrice);
  })

  .then(() => DappToken.deployed())
  .then((ins) => ins.approve(DappTokenSale.address,750000,{from:"0x875a8EBdFEe555E4a39Da62dE93C9Cb22c9A25a4"}))


};