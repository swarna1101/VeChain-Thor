const chai = require('chai');
const expect = chai.expect;

const sync = require('../../../src/node/sync');

describe('Synchronization unit tests', () => {
    it('should be able to synchronize with the network', async () => {
        // Synchronize with the network
        const result = await sync.sync();

        // Assert that synchronization was successful
        expect(result).to.be.true;
    });

    it('should be able to check the synchronization status', async () => {
        // Check the synchronization status
        const status = await sync.status();

        // Assert that the synchronization status is correct
        expect(status).to.be.a('string').that.is.not.empty;
    });
});
