# VeChain Thor Node and API

This repository contains a node server that syncs with the VeChain Thor testnet and an API that interacts with the node via RPC calls. The API exposes a REST endpoint for sending X amount to a specific address.

## Libraries used

* Node.js
* Express
* TypeScript (for the UI)
* React.js (for the UI)
* Chai (for testing)
* Mocha (for testing)

## Features
* Syncs with the VeChain Thor testnet
* REST endpoint for sending X amount to a specific address
* UI for interacting with the API
* Unit, integration, and regression tests
* CI/CD pipeline for automated testing and deployment
* Docker support for local development and deployment

## Setting up the project

1. Clone the repository
2. Install the dependencies by running `npm install` in the root directory and in the `api` and `ui` directories
3. Set up the configuration files in the `config` directories of the `root`, `api`, and `ui` directories. You can use the `default.json` files as a reference and create separate files for different environments (e.g. `production.json`, `staging.json`, `test.json`)
4. Run the node server and the API by executing the `start.sh` script in the `scripts` directory of the root and `api` directories
5. Start the UI by running `npm start` in the `ui` directory

## Running the tests

* Run the tests for the API by executing the `test.sh` script in the scripts directory of the `api` directory
* Run the tests for the node by executing the `test.sh` script in the scripts directory of the `root` directory

## CI/CD pipeline

The CI/CD pipeline is set up to run the tests and deploy the codebase from a specific branch to the server.

## Docker

The project can be run locally using Docker. You can also use Docker to deploy the application.

## Folder structure

```
.
├── api
│   ├── config
│   ├── data
│   ├── logs
│   ├── scripts
│   ├── src
│   └── test
├── node
│   ├── config
│   ├── data
│   ├── logs
│   ├── scripts
│   ├── src
│   └── test
└── ui
    ├── src
    └── test
```