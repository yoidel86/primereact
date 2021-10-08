const SampleString = artifacts.require("SampleString");
module.exports = function(deployer) {
    deployer.deploy(SampleString);
};