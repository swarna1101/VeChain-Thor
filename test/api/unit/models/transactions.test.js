const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const transactionsModel = require('../../../src/api/models/transactions');

describe('Transactions model', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should send a transaction to the VeChain Thor testnet', async () => {
        // Mock the VeChain Thor testnet transaction function
        sandbox.stub(transactionsModel, 'sendTransactionToTestnet').resolves({
            transactionId: '0x1234567890',
        });

        // Call the model's sendTransaction function
        const res = await transactionsModel.sendTransaction({
            from: '0x1234567890',
            to: '0x0987654321',
            amount: '1',
        });

        // Assert that the response is successful
        expect(res).to.be.an('object');
        expect(res).to.have.property('transactionId', '0x1234567890');
    });

    it('should retrieve a transaction from the VeChain Thor testnet', async () => {
        // Mock the VeChain Thor testnet transaction function
        sandbox.stub(transactionsModel, 'getTransactionFromTestnet').resolves({
            from: '0x1234567890',
            to: '0x0987654321',
            amount: '1',
        });

        // Call the model's getTransaction function
        const res = await transactionsModel.getTransaction('0x1234567890');

        // Assert that the response is successful
        expect(res).to.be.an('object');
        expect(res).to.have.property('from', '0x1234567890');
        expect(res).to.have.property('to', '0x0987654321');
        expect(res).to.have.property('amount', '1');
    });
});
