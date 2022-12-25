const chai = require('chai');
const expect = chai.expect;
const Web3 = require('web3');

const node = require('../../../src/node/app');

describe('Node transactions regression test', () => {
    let web3;

    before(() => {
        // Start the node
        node.listen(3000, () => {
            console.log('Node listening on port 3000');
        });

        // Connect to the node
        web3 = new Web3('http://localhost:8545');
    });

    after(() => {
        // Stop the node
        node.close();
    });

    it('should be able to send a transaction', async () => {
        // Generate two accounts
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];
        const recipient = accounts[1];

        // Get the current balance of the sender
        const initialBalance = await web3.eth.getBalance(sender);

        // Send a transaction from the sender to the recipient
        const transaction = await web3.eth.sendTransaction({
            from: sender,
            to: recipient,
            value: web3.utils.toWei('1', 'ether'),
        });

        // Get the balance of the sender after the transaction
        const finalBalance = await web3.eth.getBalance(sender);

        // Assert that the balance of the sender has decreased by the amount of the transaction
        expect(finalBalance).to.be.lessThan(initialBalance);
    });

    it('should be able to retrieve a transaction receipt', async () => {
        // Generate two accounts
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];
        const recipient = accounts[1];

        // Send a transaction from the sender to the recipient
        const transactionHash = await web3.eth.sendTransaction({
            from: sender,
            to: recipient,
            value: web3.utils.toWei('1', 'ether'),
        });

        // Retrieve the transaction receipt
        const receipt = await web3.eth.getTransactionReceipt(transactionHash);

        // Assert that the transaction receipt has the correct values
        expect(receipt).to.have.property('transactionHash', transactionHash);
        expect(receipt).to.have.property('blockNumber');
        expect(receipt).to.have.property('blockHash');
        expect(receipt).to.have.property('gasUsed');
    });
});
