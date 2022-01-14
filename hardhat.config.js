require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "bsctestnet",
  networks:{
    bsctestnet:{
      url:"https://data-seed-prebsc-2-s2.binance.org:8545",
      accounts:['e7d431ed9799d85bd5363938ed4a46a3697a82aecad935e65adb7413506d2700']
    }
  },
  solidity: {
    compilers:[
      {
        version: "0.7.5",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        },
      },
      {
        version: "0.8.4"
      }
    ]
  },
};
