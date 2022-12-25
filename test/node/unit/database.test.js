const chai = require('chai');
const expect = chai.expect;

const database = require('../../../src/node/database');

describe('Database unit tests', () => {
    it('should be able to store and retrieve a value', async () => {
        // Store a value in the database
        await database.set('key', 'value');

        // Retrieve the value from the database
        const value = await database.get('key');

        // Assert that the value was retrieved correctly
        expect(value).to.equal('value');
    });

    it('should return null for a non-existent key', async () => {
        // Try to retrieve a value for a non-existent key
        const value = await database.get('non-existent-key');

        // Assert that the value is null
        expect(value).to.be.null;
    });
});
