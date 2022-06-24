# Static NFT Document Uploader
This repo allows you to upload a document to Arweave in preperation for NFT storage! 

## Importance  
Real-world assets require contracts in document forms. Not everything can be *just* a smart contract. If NFTs as a basic unit are meant to transform the world, then the smart contracts of blockchains and the legal contracts of governments must collide. Arweave is the perfect file storage solution since all of its data is stored **permanently** on a decentralized system.  
But that doesn't mean that Arweave is the end-all be all. Governments may also provide their own links and metadata, which is why this tool allows you to include additional links as tags for your Arweave transaction.

## How to Use
Installation:
```
npm install
```
There must also be a file `wallet.json` in the main directory. This is in the JWK wallet format, which you can get by making a wallet from the [Arweave website](https://www.arweave.org/). Be sure to fund it.  

Usage:
```
npx ts-node .\arweaveUpload.ts -f DOCUMENT_PATH -P -l LINK1, LINK2, ...
```
- "-file"/ "-f" (required): Where DOCUMENT_PATH is the relative file path to the file you want to upload.
- "-production" / "-P" (optional): include if you wish to upload to Arweave mainnet. Don't include if you want to try local testnet.
- "-links" / "-l" (optional): add additional strings to add links in the Arweave transaction's tag.

Example:
```
npx ts-node .\arweaveUpload.ts -f .\deed.pdf -P -l https://propex.uk/test-file
```

## Output
The program outputs the transaction data as well as additional data:
```
Check for file's existence here:
http://127.0.0.1:1984/edQ2AkwPrZ_ZPqCe6ebBwDIyssySXF7XcTrAdEvW4Mo
UINT256 VALUE 1: 0x65645132416b7750725a5f5a5071436536656242774449797373795358463758
UINT128 VALUE 2: 0x6354724164457657344d6f
STRING VALUE:    edQ2AkwPrZ_ZPqCe6ebBwDIyssySXF7XcTrAdEvW4Mo
```
It provides:
1. A link to verify that the file has been uploaded to your provided network.
2. uint256 & uint128 values in hexidecimal format of the transaction id. This is important because storing them in this format is **40% cheaper** than storing them as a string.
3. The string id of the transaction.

## Use-Case
At [Propex]("https://www.propex.uk/), we're meshing real estate and the blockchain into one. Based in the UK.