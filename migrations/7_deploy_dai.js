// const ComisionedToken = artifacts.require('ComisionedToken')
const DaiToken = artifacts.require('DaiToken')
// const TokenFarm = artifacts.require('TokenFarm')
//
module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(DaiToken)
    const daiToken = await DaiToken.deployed()
//
//
//   // Deploy ComisionedToken
//   await deployer.deploy(ComisionedToken, accounts[1])
//   const comisionedToken = await ComisionedToken.deployed()
// //
// //   // Transfer 100 Mock Comisioned tokens to investor
//   await comisionedToken.transfer(accounts[2], '100000000000000000000')


}