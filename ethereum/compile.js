const fs = require("fs");
const path = require("path");
const solc = require("solc");

const contractPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const contractContent = fs.readFileSync(contractPath, "utf-8");

const input = {
    language: 'Solidity',
    sources: {
        'Lottery': {
            content: contractContent,
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

module.exports = output.contracts["Lottery"]["Lottery"];
