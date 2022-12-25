const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');

const node = require('../../../src/node/app');
const Block = require('../../../src/node/models/block');

describe('Database integration test', () => {
    before(() => {
        // Connect to the database
        mongoose.connect('mongodb://localhost/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Start the node
        node.listen(3000, () => {
            console.log('Node listening on port 3000');
        });
    });

    after(() => {
        // Disconnect from the database
        mongoose.connection.close();

        // Stop the node
        node.close();
    });

    it('should save blocks to the database', async () => {
        // Create a new block
        const block = new Block({
            number: 0,
            hash: '0x1234567890',
            parentHash: '0x0987654321',
        });

        // Save the block to the database
        await block.save();

        // Retrieve the block from the database
        const savedBlock = await Block.findOne({ number: 0 });

        // Assert that the block was saved correctly
        expect(savedBlock).to.be.an('object');
        expect(savedBlock.number).to.equal(0);
        expect(savedBlock.hash).to.equal('0x1234567890');
        expect(savedBlock.parentHash).to.equal('0x0987654321');
    });
});
