const VeChain = require('vechain-node');
const config = require('./config.json');

const node = new VeChain(config);

node.on('syncing', (progress) => {
    console.log(`Syncing progress: ${progress}%`);
});

node.on('sync', () => {
    console.log('Node is fully synced');
});

node.on('error', (error) => {
    console.error(error);
});

node.start();
