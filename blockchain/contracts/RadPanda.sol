// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

/// @title RadPanda ERC-721 token contract.
contract RadPanda is ERC721Tradable {
  constructor(address _proxyRegistryAddress)
    ERC721Tradable("RadPanda", "PANDA", _proxyRegistryAddress)
  {}

  function baseTokenURI() override public pure returns (string memory) {
    return "https://animal-kingdom.rad.live/pandas/";
  }

  function contractURI() public pure returns (string memory) {
    return "https://www.radkingdom.org/";
  }
}