# VeChain-Thor

To set up a machine that runs a node server that syncs with the VeChain Thor testnet, you will need to follow these steps:

* Install the necessary software and dependencies on your machine. You will need to install the VeChain Thor node software and any other dependencies required for it to run, such as Go and Git.

* Configure the VeChain Thor node software. You will need to create a configuration file for the node software, specifying settings such as the network type (testnet or mainnet), data directory, and RPC settings.

* Start the VeChain Thor node. Once the node software is installed and configured, you can start it by running the appropriate command in your terminal. The node will begin syncing with the testnet and downloading the blockchain.

* Set up a REST endpoint. To expose a REST endpoint that can send X amount to an address, you will need to create an application that listens for HTTP requests and sends the appropriate transactions to the VeChain Thor node using the RPC interface.

* Secure the RPC endpoint. To prevent direct RPC endpoints from being exposed, you can set up another small application that acts as an intermediary between the REST endpoint and the VeChain Thor node. This application can make RPC calls to the node on behalf of the REST endpoint, and can also include security measures such as authentication and rate limiting to protect against malicious requests.

This code creates an instance of the `VeThor` client and uses it to send transactions to the VeChain Thor node when a request is made to the `/send` endpoint. You can customize this code to suit your specific needs and add additional security measures as needed.

```
const express = require('express');
const VeThor = require('vethor-client');

// Create an instance of the VeThor client
const veThor = new VeThor({
  host: 'localhost', // Hostname of the VeChain Thor node
  port: 8669, // RPC port of the VeChain Thor node
  username: 'vechain', // RPC username (if required)
  password: 'password' // RPC password (if required)
});

// Create a new Express app
const app = express();

// Define a route for sending transactions
app.post('/send', async (req, res) => {
  // Parse the request body to get the recipient address and amount to send
  const { to, amount } = req.body;

  // Send the transaction to the VeChain Thor node
  try {
    const txHash = await veThor.sendTransaction({ to, amount });
    res.send({ success: true, txHash });
  } catch (error) {
    res.send({ success: false, error });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

```

To ensure that your VeChain Thor node is synced with the testnet and starts automatically on login, you can use a process manager such as **PM2**. PM2 is a production process manager for Node.js applications that can help you keep your application running smoothly and automatically restart it in case of failure.

Here is an example of how you can use PM2 to manage your VeChain Thor node:

* Install PM2 on your machine:
`npm install pm2 -g`
* Start your VeChain Thor node with PM2: `pm2 start path/to/vechain/binary --name="vechain"`
* Save the PM2 configuration to ensure that your node is restarted automatically on login: `pm2 save`
* You can also configure PM2 to automatically restart your node in case of failure by adding the --watch flag when starting the node: `pm2 start path/to/vechain/binary --name="vechain" --watch`

This will cause PM2 to monitor your node and automatically restart it if it crashes or becomes unresponsive.

