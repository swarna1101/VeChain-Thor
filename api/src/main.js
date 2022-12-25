const express = require('express');
const bodyParser = require('body-parser');
const rpc = require('./utils/rpc');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require('./routes'));

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
    rpc.init();
});
