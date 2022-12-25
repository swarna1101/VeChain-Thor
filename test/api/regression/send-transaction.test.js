const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');

const app = require('../../../src/api/app');

describe('Send transaction regression test', () => {
    it('should send a transaction', async () => {
        // Send a transaction request
        const res = await request(app)
            .post('/send')
            .send({
                from: '0x1234567890',
                to: '0x0987654321',
                amount: '1',
            });

        // Assert that the response is correct
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('transactionId');
    });
});
