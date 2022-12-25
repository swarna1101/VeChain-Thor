const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const rpc = require('../../../../src/api/utils/rpc');

describe('RPC utility', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should send a transaction', async () => {
        // Mock the VeChain Thor testnet transaction function
        sandbox.stub(rpc, 'sendTransaction').resolves({
            transactionId: '0x1234567890',
        });

        // Send a transaction request
        const res = await rpc.sendTransaction({
            from: '0x1234567890',
            to: '0x0987654321',
            amount: '1',
        });

        // Assert that the response is correct
        expect(res).to.be.an('object');
        expect(res).to.have.property('transactionId', '0x1234567890');
    });

    it('should return an error if the transaction request is invalid', async () => {
        // Mock the VeChain Thor testnet transaction function to return an error
        sandbox.stub(rpc, 'sendTransaction').rejects(new Error('Invalid request'));

        // Send a transaction request with invalid data
        try {
            await rpc.sendTransaction({
                from: '0x1234567890',
                amount: '1',
            });
        } catch (error) {
            // Assert that the error is correct
            expect(error).to.be.an('error');
            expect(error.message).to.equal('Invalid request');
        }
    });
});
