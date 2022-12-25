const VeChain = require('thor-devkit');

function isAddress(address) {
    return VeChain.Utils.isAddress(address);
}

function isPositiveNumber(num) {
    return typeof num === 'number' && num > 0;
}

module.exports = { isAddress, isPositiveNumber };
