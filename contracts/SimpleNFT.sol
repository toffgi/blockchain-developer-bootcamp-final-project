// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

/// @title Simple NFT Minter
/// @author Gianluca Toffoletto
/// @notice Mint NFTs from uploaded images. 
///         Developed for the final project for the Consensys Academy's 2021 blockchain developer bootcamp
/// @dev The contract leverages on OpenZeppelin smart contract libraries

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SimpleNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    
    /// @dev constructor for the SimpleNFT contract
    constructor() ERC721("SimpleNFT", "SNFT") {}

    /// @notice Will be concatenated with token IDs to generate the token URIs (from OpenZeppelin ERC721)
    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    /// @dev Mints the token to the msg.sender
    /// @param uri token's URI
    /// @param to address the NFT is minted to
    function nftMint(address to, string memory uri) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    /// @dev Override required by Solidity, recommeded by OpenZeppelin
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    /// @dev Override required by Solidity, recommeded by OpenZeppelin
    /// @return tokenId
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /// @dev this role is not needed to use the mint function
    /// @notice creates a role to identify "patrons" who made a donation (might be used to reward with "patron badges", e.g.)
    mapping(address => bool) public patronRole;

    /// @notice a getter function to check if an account is a patron, not currently used
    /// @param _account the account to query
    function getPatronRole(address _account) public view returns (bool) {
        return patronRole[_account];
    }

    modifier minumumDonation() {
        require(msg.value >= 2000000000, "Donation should be at least 2 gwei.");
        _;
      }

    /// @notice function to donate at least 2 gweis, assigns the "patron" role
    /// @param _patron the account to add as a patron
    /// change to donate
    function Donate(address _patron) public payable minumumDonation {
        require(_patron != address(0));
        patronRole[_patron] = true;
    }

    /// @dev receive and fallback to allow the contract to receive data/messages
    receive() external payable {
    }
    fallback() external payable {
    }

    /// @dev Function to withdraw ether from contract address
    /// @notice only the owner can withdraw the donations
    function withdrawDonations() public onlyOwner {
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
}