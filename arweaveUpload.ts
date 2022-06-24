import Arweave from "arweave/node/common";
import ArLocal from "arlocal";
import yargs from 'yargs';
import jwk from './wallet.json';
import fs from 'fs';

const args = yargs.options({
    file: { type: 'string', demandOption: true, alias: 'f' },
    production: { type: 'boolean', demandOption: false, alias: 'P' },
    links: { type: 'array', demandOption: false, alias: 'l' }
}).argv;

async function main() {
    console.log("BEGINNING NFT DOCUMENT UPLOAD");
    const isProduction = args["production"];

    // Choose between production or local environment
    let arweave: Arweave, arlocal: ArLocal;
    if (isProduction) {
        arweave = Arweave.init({
            host: 'arweave.net',
            port: 443,
            protocol: 'https'
        });
    }
    else {
        arlocal = new ArLocal(1984, false);
        await arlocal.start();
        arweave = Arweave.init({
            host: '127.0.0.1',
            port: 1984,
            protocol: 'http'
        });
    }

    // Get wallet address & add AR tokens if in development
    const walletAddress = await arweave.wallets.jwkToAddress(jwk);
    if (!isProduction) {
        await arweave.api.get(`/mint/${walletAddress}/1000000000000000`);
        await arweave.api.get('mine');
    }
    console.log(await arweave.wallets.getBalance(walletAddress));

    // Construct buffer upload.
    console.log(`Reading in ${args['file']}...`);
    let dataBuffer = fs.readFileSync(args['file']);
    let bufferTransaction = await arweave.createTransaction({
        data: dataBuffer
    }, jwk);

    // Get file type
    const splitName = args['file'].split(".");
    const fileType = splitName[splitName.length - 1];

    // Add additional metadata links
    bufferTransaction.addTag('Content-Type', fileType);
    args['links']?.forEach((link, index) =>
        bufferTransaction.addTag('link-' + index, link)
    );

    // Chunk uploading
    await arweave.transactions.sign(bufferTransaction, jwk);
    let uploader = await arweave.transactions.getUploader(bufferTransaction);
    while (!uploader.isComplete) {
        await uploader.uploadChunk();
        console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
    }

    // Print out all the data
    console.log(bufferTransaction);
    console.log("Check for file's existence here:")
    console.log(`${arweave.api.config.protocol}://${arweave.api.config.host}:${arweave.api.config.port}/${bufferTransaction.id}`)

    // Converts to uint format (is ~40% cheaper)
    const hexValue = Buffer.from(bufferTransaction.id).toString('hex');
    const number1 = '0x' + hexValue.substring(0, 64);
    const number2 = '0x' + hexValue.substring(64, 86);
    console.log("UINT256 VALUE 1: " + number1);
    console.log("UINT128 VALUE 2: " + number2);
    console.log("STRING VALUE:    " + bufferTransaction.id);

    // Leave server open for 1 minute before ending if on local host
    if(!isProduction) {
        await new Promise((resolve, reject) => {
            setTimeout(() => { resolve(1) }, 60000);
        });
        await arlocal.stop();
    } 
    
    process.exit();
}

main();