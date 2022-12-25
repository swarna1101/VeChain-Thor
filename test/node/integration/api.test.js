const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');

const app = require('../../../src/api/app');
const node = require('../../../src/node/app');

describe('API integration test', () => {
    before(() => {
        // Start the node
        node.listen(3000, () => {
            console.log('Node listening on port 3000');
        });
    });

    after(() => {
        // Stop the node
        node.close();
    });

    it('should communicate with the API', async () => {
        // Send a request to the API
        const res = await request(app).get('/');

        // Assert that the response is correct
        expect(res.status).to.equal(200);
        expect(res.text).to.equal('API running');
    });
});
