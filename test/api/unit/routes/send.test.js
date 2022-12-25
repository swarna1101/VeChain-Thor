const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const request = require('supertest');

const app = require('../../../src/api/app');

describe('Send route', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should send a transaction', async () => {
        // Mock the VeChain Thor testnet transaction function
        sandbox.stub(app.locals.rpc, 'sendTransaction').resolves({
            transactionId: '0x1234567890',
        });

        // Send a request to the /send route
        const res = await request(app).post('/send').send({
            from: '0x1234567890',
            to: '0x0987654321',
            amount: '1',
        });

        // Assert that the response is successful
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('transactionId', '0x1234567890');
    });

    it('should return an error if the transaction request is invalid', async () => {
        // Send a request to the /send route with invalid data
        const res = await request(app).post('/send').send({
            from: '0x1234567890',
            amount: '1',
        });

        // Assert that the response is an error
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error', 'Invalid request');
    });
});
