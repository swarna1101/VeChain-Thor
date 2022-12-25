const Web3 = require('web3');
const RpcProvider = require('thor-rpc-provider');

const config = require('../../../config');

const provider = new RpcProvider(config.rpc.url);
const web3 = new Web3(provider);

async function init() {
    try {
        await provider.ready();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

async function send(to, amount) {
    try {
        const tx = await web3.eth.sendTransaction({
            to,
            value: web3.utils.toWei(amount, 'ether')
        });
        return tx.transactionHash;
    } catch (error) {
        throw error;
    }
}

module.exports = { init, send };
