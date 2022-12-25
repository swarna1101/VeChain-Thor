const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');

const app = require('../../../src/api/app');

describe('API app', () => {
    it('should return a 404 error for an unknown route', async () => {
        // Send a request to an unknown route
        const res = await request(app).get('/unknown');

        // Assert that the response is a 404 error
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error', 'Not found');
    });
});
