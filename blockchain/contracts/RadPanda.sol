// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

/// @title RadPanda ERC-721 token contract.
contract RadPanda is ERC721Tradable {
  constructor(address _proxyRegistryAddress, uint256 numTokens, address initialMintAddress)
    ERC721Tradable("RadPanda", "PANDA", _proxyRegistryAddress)
  {
    _initialMint(numTokens, initialMintAddress);
  }

  function baseTokenURI() override public pure returns (string memory) {
    return "https://animal-kingdom.rad.live/pandas/";
  }

  function contractURI() public pure returns (string memory) {
    return "https://www.radkingdom.org/";
  }

  function _initialMint(uint256 _numTokens, address _initialMintAddress) private {
    for (uint256 i=0; i<numTokens; i++) {
      mintTo(_initialMintAddress);
    }
  }
}