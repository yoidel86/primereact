const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
module.exports = {
    // Uncommenting the defaults below
    // provides for an easier quick-start with Ganache.
    // You can also follow this format for other networks;
    // see <http://truffleframework.com/docs/advanced/configuration>
    // for more details on how to specify configuration options!
    contracts_directory:'./contracts',
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*"
        },
        test: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*"
        },
        testnet: {
            provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
            network_id: 97,
            confirmations: 6,
            timeoutBlocks: 400,
            skipDryRun: true
        },mainnet: {
          provider: () => new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/2fc8426062744d85957f8f3e5170c436`),
          network_id: 1,
      },
    },
    compilers: {
        solc: {
          version: "0.8.9",
        },
      },
    //   console: {
    //     require: [
    //       { path: "./src/abis/ArtToken.json" },
    //     ]
    // },
    contracts_build_directory: './src/abis/',

};
