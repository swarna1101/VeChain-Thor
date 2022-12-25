const chai = require('chai');
const expect = chai.expect;

const validator = require('../../../../src/api/utils/validator');

describe('Validator utility', () => {
    it('should validate a valid address', () => {
        // Check a valid address
        const isValid = validator.isAddress('0x1234567890abcdef1234567890abcdef12345678');
        expect(isValid).to.be.true;
    });

    it('should invalidate an invalid address', () => {
        // Check an invalid address
        const isValid = validator.isAddress('0x1234567890abcdef1234567890abcdef123456789');
        expect(isValid).to.be.false;
    });

    it('should validate a valid amount', () => {
        // Check a valid amount
        const isValid = validator.isAmount('123.456');
        expect(isValid).to.be.true;
    });

    it('should invalidate an invalid amount', () => {
        // Check an invalid amount
        const isValid = validator.isAmount('123.4567');
        expect(isValid).to.be.false;
    });
});
