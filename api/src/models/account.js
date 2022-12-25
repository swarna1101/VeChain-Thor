const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Account', accountSchema);
