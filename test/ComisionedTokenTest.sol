pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ComisionedToken.sol";



contract TestComisionedToken{  

  function testInitialBalanceUsingDeployedContract() public {
    ComisionedToken meta = ComisionedToken(DeployedAddresses.ComisionedToken());

    uint expected = 999900000000000000000000;

    Assert.equal(meta.balanceOf(0xfB97cAbB6c3e31583F0d45E4E1B8f44f5a756813), expected, "Owner should have 10000 MetaCoin initially");
  }

  // function testInitialBalanceWithNewMetaCoin() public {
  //   ComisionedToken meta2 = new ComisionedToken();

  //   uint expected = 1000000000000000000000000;

  //   Assert.equal(meta2.balanceOf(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  // }
}
