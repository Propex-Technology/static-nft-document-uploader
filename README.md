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

## Use-Case
At [Propex]("https://www.propex.uk/), we're meshing real estate and the blockchain into one. Based in the UK.