const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const accountsModel = require('../../../src/api/models/accounts');

describe('Accounts model', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should get an account from the VeChain Thor testnet', async () => {
        // Mock the VeChain Thor testnet account function
        sandbox.stub(accountsModel, 'getAccountFromTestnet').resolves({
            balance: '1',
        });

        // Call the model's getAccount function
        const res = await accountsModel.getAccount('0x1234567890');

        // Assert that the response is successful
        expect(res).to.be.an('object');
        expect(res).to.have.property('balance', '1');
    });

    it('should create a new account on the VeChain Thor testnet', async () => {
        // Mock the VeChain Thor testnet account function
        sandbox.stub(accountsModel, 'createAccountOnTestnet').resolves({
            address: '0x0987654321',
        });

        // Call the model's createAccount function
        const res = await accountsModel.createAccount();

        // Assert that the response is successful
        expect(res).to.be.an('object');
        expect(res).to.have.property('address', '0x0987654321');
    });
});
