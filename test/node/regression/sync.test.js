const chai = require('chai');
const expect = chai.expect;
const Web3 = require('web3');

const node = require('../../../src/node/app');

describe('Node sync regression test', () => {
    let web3;

    before(() => {
        // Start the node
        node.listen(3000, () => {
            console.log('Node listening on port 3000');
        });

        // Connect to the node
        web3 = new Web3('http://localhost:8545');
    });

    after(() => {
        // Stop the node
        node.close();
    });

    it('should be able to retrieve the current block number', async () => {
        // Retrieve the current block number
        const blockNumber = await web3.eth.getBlockNumber();

        // Assert that the block number is a number
        expect(blockNumber).to.be.a('number');
    });

    it('should be able to retrieve a block by its number', async () => {
        // Retrieve the current block number
        const blockNumber = await web3.eth.getBlockNumber();

        // Retrieve the block data for the current block
        const block = await web3.eth.getBlock(blockNumber);

        // Assert that the block data is an object
        expect(block).to.be.an('object');
    });
});
