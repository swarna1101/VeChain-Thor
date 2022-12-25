const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const request = require('supertest');
const app = require('../../../src/api/app');

describe('API integration', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should sync the API with the VeChain Thor testnet', async () => {
        // Mock the VeChain Thor testnet sync function
        sandbox.stub(app, 'syncWithTestnet').resolves();

        // Call the API sync endpoint
        const res = await request(app).get('/api/sync');

        // Assert that the response is successful
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', 'Syncing with VeChain Thor testnet...');
    });

    it('should start the API at login', async () => {
        // Mock the API start function
        sandbox.stub(app, 'start').resolves();

        // Call the API start endpoint
        const res = await request(app).get('/api/start');

        // Assert that the response is successful
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', 'Starting API...');
    });

    it('should restart the API if it crashes', async () => {
        // Mock the API restart function
        sandbox.stub(app, 'restart').resolves();

        // Call the API restart endpoint
        const res = await request(app).get('/api/restart');

        // Assert that the response is successful
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', 'Restarting API...');
    });

    it('should send a transaction through the API', async () => {
        // Mock the API transaction function
        sandbox.stub(app, 'sendTransaction').resolves({
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
});
