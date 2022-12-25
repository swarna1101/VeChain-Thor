const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');

const app = require('../../../src/api/app');

describe('Get balance regression test', () => {
    it('should get the balance of an account', async () => {
        // Get the balance of an account
        const res = await request(app)
            .get('/balance')
            .query({ address: '0x1234567890' });

        // Assert that the response is correct
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('balance');
    });
});
