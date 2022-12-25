const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const request = require('supertest');
const app = require('../../../src/api/app');

describe('API transaction integration', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should send a transaction to the VeChain Thor testnet', async () => {
        // Mock the VeChain Thor testnet transaction function
        sandbox.stub(app, 'sendTransactionToTestnet').resolves({
            transactionId: '0x1234567890',
        });

        // Call the API transaction endpoint
        const res = await request(app)
            .post('/api/transactions')
            .send({
                from: '0x1234567890',
                to: '0x0987654321',
                amount: '1',
            });

        // Assert that the response is successful
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('transactionId', '0x1234567890');
    });

    it('should retrieve a transaction from the VeChain Thor testnet', async () => {
        // Mock the VeChain Thor testnet transaction function
        sandbox.stub(app, 'getTransactionFromTestnet').resolves({
            from: '0x1234567890',
            to: '0x0987654321',
            amount: '1',
        });

        // Call the API transaction endpoint
        const res = await request(app).get('/api/transactions/0x1234567890');

        // Assert that the response is successful
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('from', '0x1234567890');
        expect(res.body).to.have.property('to', '0x0987654321');
        expect(res.body).to.have.property('amount', '1');
    });
});
