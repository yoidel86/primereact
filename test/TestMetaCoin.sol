pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MetaCoin.sol";
import "../contracts/DaiToken.sol";

contract TestMetaCoin {

  function testInitialBalanceUsingDeployedContract() public {
    MetaCoin meta = MetaCoin(DeployedAddresses.MetaCoin());

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }

  function testInitialBalanceWithNewMetaCoin() public {
    MetaCoin meta = new MetaCoin();

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }

}

contract TestDaiToken{  

  function testInitialBalanceUsingDeployedContract() public {
    DaiToken meta = DaiToken(DeployedAddresses.DaiToken());

    uint expected = 999900000000000000000000;

    Assert.equal(meta.balanceOf(0xfB97cAbB6c3e31583F0d45E4E1B8f44f5a756813), expected, "Owner should have 10000 MetaCoin initially");
  }

  function testInitialBalanceWithNewMetaCoin() public {
    DaiToken meta2 = new DaiToken();

    uint expected = 1000000000000000000000000;

    Assert.equal(meta2.balanceOf(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }
}
