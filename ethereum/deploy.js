const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const compiledFactory = require("./build/CampaignFactory.json");
const compiledCampaign = require("./build/Campaign.json");

const provider = new HDWalletProvider("YOUR_ACCOUNTS_SEEDS", "YOUR_INFURA_URL");

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attemping to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployed to : ", result.options.address);
  provider.engine.stop();
};

deploy();
