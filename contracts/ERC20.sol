pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Vaska is ERC20, Ownable {
  constructor() ERC20('Vaska', 'VSK') {
    mint(msg.sender, 10 * 10 ** 18);
  }

  function mint(address to, uint decimals) public onlyOwner {
    _mint(to, decimals);
  }
}
