# Rad Pandas NFTs
Commissioned work for Rad.live

## Contract Addresses (Mainnet)
### RadPanda
#### [](https://etherscan.io/address/)
### RadPandaFactory
#### [](https://etherscan.io/address/)

## Setting Up The Environment
### `1`
Install [Git](https://git-scm.com/downloads)
### `2`
Install [Node.js](https://nodejs.org/en/download/)
### `3`
`$ git clone https://github.com/jshstw/rad-pandas.git`
### `4`
`$ cd rad-pandas/blockchain`
### `5`
`$ npm install`
### `6`
Create an [Infura](https://infura.io/) account and create a new project
### `7`
Apply for an [OpenSea API Key](https://docs.opensea.io/reference/request-an-api-key)
### `8`
Rename the 'secrets_TEMPLATE.json' file to 'secrets.json'
### `9`
Fill 'secrets.json' file with the 'Project Id' from Infura, the seed phrase from your Ethereum wallet and the OpenSea API key
### `10`
`$ truffle deploy --network live`
### `11`
`$ node initial_sale.js`

## URI Structure
### Base URI
https://animal-kingdom.rad.live/pandas/
### Token URI (E.g. tokenId=3)
https://animal-kingdom.rad.live/pandas/3

## OpenSea Proxy Registry Addresses
### Mainnet
#### `0xa5409ec958c83c3f309868babaca7c86dcb077c1`
### Rinkeby
#### `0xf57b2c51ded3a29e6891aba85459d600256cf317`

## Notes
- .jpg format
- Files stored on web server
- 10,000 NFTs
- Sale on OpenSea
- Lazy-minting
- ERC-721 standard
