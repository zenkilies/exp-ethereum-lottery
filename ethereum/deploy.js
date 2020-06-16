const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const {abi, evm} = require("./compile");

require("dotenv").config();

const provider = new HDWalletProvider(
    process.env.RINKEBY_MNEMONIC,
    process.env.RINKEBY_INFURA_URL,
);

const web3 = new Web3(provider);

(async () => {

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    const result = await (new web3.eth.Contract(abi))
        .deploy({
            data: evm.bytecode.object,
        })
        .send({
            from: account,
        });

    console.log("Deployed successful to address:", result.options.address);

    process.exit(0);

})().catch(console.error);
