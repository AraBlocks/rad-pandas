// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./IFactoryERC721.sol";
import "./RadPanda.sol";

contract RadPandaFactory is FactoryERC721, Ownable {
  using Strings for string;

  event Transfer(
    address indexed from,
    address indexed to,
    uint256 indexed tokenId
  );

  address public proxyRegistryAddress;
  address public nftAddress;
  string public baseURI = "https://animal-kingdom.rad.live/pandas/factory/";

  /// @dev Limit max token supply to ten thousand.
  uint256 MAX_SUPPLY = 10000;

  uint256 NUM_OPTIONS = 2;
  uint256 ONE_PANDA = 0;
  uint256 THREE_PANDAS = 1;

  constructor(address _proxyRegistryAddress, address _nftAddress) {
    proxyRegistryAddress = _proxyRegistryAddress;
    nftAddress = _nftAddress;

    fireTransferEvents(address(0), owner());
  }

  function name() override external pure returns (string memory) {
    return "RadKingdom Pandas Sale";
  }

  function symbol() override external pure returns (string memory) {
    return "PANDA";
  }

  function supportsFactoryInterface() override public pure returns (bool) {
    return true;
  }

  function numOptions() override public view returns (uint256) {
    return NUM_OPTIONS;
  }

  function transferOwnership(address newOwner) override public onlyOwner {
    address _prevOwner = owner();
    super.transferOwnership(newOwner);

    fireTransferEvents(_prevOwner, newOwner);
  }

  function fireTransferEvents(address _from, address _to) private {
    for (uint256 i = 0; i < NUM_OPTIONS; i++) {
      emit Transfer(_from, _to, i);
    }
  }

  function mint(uint256 _optionId, address _toAddress) override public {
    ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
    assert(address(proxyRegistry.proxies(owner())) == _msgSender() || owner() == _msgSender());
    require(canMint(_optionId));

    RadPanda radPanda = RadPanda(nftAddress);
    if (_optionId == ONE_PANDA) {
      radPanda.mintTo(_toAddress);
    } else if (_optionId == THREE_PANDAS) {
      for (uint256 i=0; i<3; i++) {
        radPanda.mintTo(_toAddress);
      }
    }
  }

  function canMint(uint256 _optionId) override public view returns (bool) {
    if (_optionId >= NUM_OPTIONS) {
      return false;
    }

    RadPanda radPanda = RadPanda(nftAddress);
    uint256 pandaSupply = radPanda.totalSupply();

    uint256 numItemsAllocated = 0;
    if (_optionId == ONE_PANDA) {
      numItemsAllocated = 1;
    } else if (_optionId == THREE_PANDAS) {
      numItemsAllocated = 3;
    }

    return pandaSupply < (MAX_SUPPLY - numItemsAllocated);
  }

  function tokenURI(uint256 _optionId) override external view returns (string memory) {
    return string(abi.encodePacked(baseURI, Strings.toString(_optionId)));
  }

  /**
   * Hack to get things to work automatically on OpenSea.
   * Use transferFrom so the frontend doesn't have to worry about different method names.
   */
  function transferFrom(
    address _from,
    address _to,
    uint256 _tokenId
  ) public {
    mint(_tokenId, _to);
  }

  /**
   * Hack to get things to work automatically on OpenSea.
   * Use isApprovedForAll so the frontend doesn't have to worry about different method names.
   */
  function isApprovedForAll(address _owner, address _operator)
    public
    view
    returns (bool)
  {
    if (owner() == _owner && _owner == _operator) {
      return true;
    }

    ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
    if (
      owner() == _owner &&
      address(proxyRegistry.proxies(_owner)) == _operator
    ) {
      return true;
    }

    return false;
  }

  /**
   * Hack to get things to work automatically on OpenSea.
   * Use isApprovedForAll so the frontend doesn't have to worry about different method names.
   */
  function ownerOf(uint256 _tokenId) public view returns (address _owner) {
    return owner();
  }
}