const chai = require('chai');
const expect = chai.expect;
const Web3 = require('web3');
const LevelDB = require('level');

const node = require('../../../src/node/app');
const database = require('../../../src/node/database');

describe('Node database regression test', () => {
    let web3;
    let db;

    before(() => {
        // Start the node
        node.listen(3000, () => {
            console.log('Node listening on port 3000');
        });

        // Connect to the node
        web3 = new Web3('http://localhost:8545');

        // Connect to the database
        db = database.connect();
    });

    after(() => {
        // Stop the node
        node.close();

        // Close the database connection
        db.close();
    });

    it('should be able to store a block in the database', async () => {
        // Retrieve the current block number
        const blockNumber = await web3.eth.getBlockNumber();

        // Retrieve the block data for the current block
        const block = await web3.eth.getBlock(blockNumber);

        // Store the block in the database
        await database.storeBlock(db, blockNumber, block);

        // Retrieve the block from the database
        const storedBlock = await database.getBlock(db, blockNumber);

        // Assert that the block data is the same as the stored block data
        expect(storedBlock).to.deep.equal(block);
    });

    it('should be able to store a transaction in the database', async () => {
        // Retrieve the current block number
        const blockNumber = await web3.eth.getBlockNumber();

        // Retrieve the block data for the current block
        const block = await web3.eth.getBlock(blockNumber);

        // Retrieve the first transaction in the block
        const transaction = block.transactions[0];

        // Store the transaction in the database
        await database.storeTransaction(db, transaction.hash, transaction);

        // Retrieve the transaction from the database
        const storedTransaction = await database.getTransaction(db, transaction.hash);

        // Assert that the transaction data is the same as the stored transaction data
        expect(storedTransaction).to.deep.equal(transaction);
    });
});
