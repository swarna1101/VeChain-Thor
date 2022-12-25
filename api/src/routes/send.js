const express = require('express');
const router = express.Router();
const rpc = require('../utils/rpc');
const validator = require('../utils/validator');

router.post('/send', async (req, res) => {
    const { to, amount } = req.body;

    if (!validator.isAddress(to)) {
        return res.status(400).send({ error: 'Invalid address' });
    }

    if (!validator.isPositiveNumber(amount)) {
        return res.status(400).send({ error: 'Invalid amount' });
    }

    try {
        const txHash = await rpc.send(to, amount);
        res.send({ txHash });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
