# blockchain-developer-bootcamp-final-project

# Simple NFT Minter 
Upload images and mint NFTs!

## Deployed version url:

https://toffgi.github.io/blockchain-developer-bootcamp-final-project/

### Prerequisites

- Node.js >= v16
- Truffle

### Tech Stack:

- Blockchain SDK: [Truffle](https://trufflesuite.com/) (Boilerplate: [React Truffle Box](https://trufflesuite.com/boxes/react/))
- Ethereum API: [Infura](https://infura.io/)
- NFT Contract Library: [Open Zeppelin](https://openzeppelin.com/)
- NFT metadata storage: [IPFS](https://ipfs.io/)

Wallet Support:

- MetaMask

Chain Support:

- Rinkeby

## Setup
### Contracts setup

- Run `npm install` in project root to install Truffle build and smart contract dependencies
- Adjust the installation of the `nft.storage` package by applying [this fix](https://stackoverflow.com/questions/70063600/cant-resolve-ipfs-car-blockstore-memory-when-importing-nft-storage) 
- Run `truffle develop` that will launch a local testnet in port `8545` and open the Truffle console
- Migrate contracts in Truffle console: `migrate`
- Run tests in Truffle console: `test`

### Frontend setup

- `cd client`
- `npm install`
- `npm run start`
- Open `http://localhost:3000` (if it does not open automatically)

### MetaMask local network setup

- Make sure your MetaMask localhost network is in port `8545` with network id `1337`.
- Launch Truffle local testnet `truffle develop` 
- Migrate contracts in Truffle console: `migrate`
- `cd client && npm run start`
- Open local ui from `http://localhost:3000`
- Copy (one of) the private keys generated from the Truffle console and import it in MetaMask. Each account imported in this way should have 100 ETH available in the Truffle testnet 
- If you get `TXRejectedError` when sending a transaction, reset your MetaMask account from Advanced settings.

## Smart Contract

[SimpleNFT.sol](https://rinkeby.etherscan.io/address/0x0a8799f1fe018bbf09fa161bD7Ae2Bc03C292A41) - Smart contract to mint an NFT, based on OpenZeppelin. The contract will hold the donations made to it until function withdrawDonations() is called by the contract's owner.

## Environment variables (not needed for running project locally)

```
RINKEBY_INFURA_PROJECT_ID=
RINKEBY_MNEMONIC=
```

## Project description

Quick and dirty NFT minter app. 
The user uploads an image, provides a title and a description and can mint an NFT on Rinkeby.
The minted NFTs are showcased in the linked [OpenSea collection](https://testnets.opensea.io/collection/simplenft-blockchaindevbootcprj), where they can also be listed for sale. 
The user can become a "patron" of the project by making a voluntary donation to the contract.

## Simple workflow

1. Enter [App web site](https://toffgi.github.io/blockchain-developer-bootcamp-final-project/) 
2. Login with MetaMask
3. Set a title and a description for the NFT
4. Upload an image
5. Click on "MINT!" button to mint the NFT to user account (smart contract call)
6. Once the NFT tokenId is generated, the NFT is visualized (after loaded) in a new screen
7. The token can be listed for sale in the dedicated OpenSea collection

### TODO
- include collection and marketplace directly on App without relying on OpenSea support

## Directory structure

- `client`: Project's React frontend.
- `contracts`: Smart contracts that are deployed in the Rinkeby testnet.
- `migrations`: Migration files for deploying contracts in `contracts` directory.
- `test`: Smart contract test.

## Screencast link

https://youtu.be/JQFWWINM_JQ

## Public Ethereum wallet for certification:

`0xFE470eA311DBDE1726F467081671E4410aA89522`
