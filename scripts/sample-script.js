
const hre = require("hardhat");

//   TimeERC20Token deployed to: 0x6Ba1d0Eda6Ec87873b75d0cA0A9159F3a96e817D
// MEMOries deployed to: 0x9F661c68707d63F5A1B1C827E00c79fCdCA9934A
// wMEMO deployed to: 0x7d6FFCE39c0C0172cEb5123B78fBD30DaaF4Ba6A
// Wonderland_ZapIn_V1 deployed to: 0x5f7B41Dc14D0B1fD24b810cc4658e01dE88946E6
// TimeTreasury deployed to: 0xD09776e89cd6232810b2925D4b439BbdFA3baAC1
// TimeBondingCalculator deployed to: 0xf9610488B3fCa2566E35654dF5938e8Ef3676088
// TimeBondDepository deployed to: 0x7362Daf509c641b8DF661ca8CDD04AdF9874942e
// TimeStaking deployed to: 0xaa8B4502039d839F4377b826Ea282A0559C49ED9
// StakingHelper deployed to: 0xD1190522eabCec0CC196eB9E5caF011BA8Eb8A88
// StakingWarmup deployed to: 0x4A9090FF96E919aD8b0bb25257407D4A909e522e
// Distributor deployed to: 0x0F2F8439d0D5041F9bA9Ba22b84A766887f27cF4

async function main() {
  var mebAddress = '0xba3bbC92C70BF973920CdE3DdAFab34F7ad44A15';
  var myAddress = '0x389c5D2064Ec4e2408b414f286F1580F60E69089';
  const secondsNeededForQueue = 0;
  var epochLength = 28800;
  var nextEpochTime = 0;
  var limitAmount = 0;
  var firstEpochNumber = 0;
  var firstEpochTime = 0;

  var Time = {address:"0x6Ba1d0Eda6Ec87873b75d0cA0A9159F3a96e817D"}
  var MEMOries = {address:"0x9F661c68707d63F5A1B1C827E00c79fCdCA9934A"}
  var wMEMO = {address:"0x7d6FFCE39c0C0172cEb5123B78fBD30DaaF4Ba6A"}
  var Wonderland_ZapIn_V1 = {address:"0x5f7B41Dc14D0B1fD24b810cc4658e01dE88946E6"}
  var TimeTreasury = {address:"0xD09776e89cd6232810b2925D4b439BbdFA3baAC1"}
  var TimeBondingCalculator = {address:"0xf9610488B3fCa2566E35654dF5938e8Ef3676088"}
  var TimeBondDepository = {address:"0x7362Daf509c641b8DF661ca8CDD04AdF9874942e"}

  // var Time = await hre.ethers.getContractFactory("TimeERC20Token");
  // Time = await Time.deploy();
  // await Time.deployed();
  // console.log("TimeERC20Token deployed to:", Time.address);

  // var MEMOries = await hre.ethers.getContractFactory("MEMOries");
  // MEMOries = await MEMOries.deploy();
  // await MEMOries.deployed();
  // console.log("MEMOries deployed to:", MEMOries.address);

  // var wMEMO = await hre.ethers.getContractFactory("wMEMO");
  // wMEMO = await wMEMO.deploy(myAddress);
  // await wMEMO.deployed();
  // console.log("wMEMO deployed to:", wMEMO.address);



  // var Wonderland_ZapIn_V1 = await hre.ethers.getContractFactory("Wonderland_ZapIn_V1");
  // Wonderland_ZapIn_V1 = await Wonderland_ZapIn_V1.deploy(myAddress);
  // await Wonderland_ZapIn_V1.deployed();
  // console.log("Wonderland_ZapIn_V1 deployed to:", Wonderland_ZapIn_V1.address);

  // var TimeTreasury = await hre.ethers.getContractFactory("TimeTreasury");
  // TimeTreasury = await TimeTreasury.deploy(Time.address,  mebAddress, secondsNeededForQueue, limitAmount);
  // await TimeTreasury.deployed();
  // console.log("TimeTreasury deployed to:", TimeTreasury.address);

  // var TimeBondingCalculator = await hre.ethers.getContractFactory("TimeBondingCalculator");
  // TimeBondingCalculator = await TimeBondingCalculator.deploy(Time.address);
  // await TimeBondingCalculator.deployed();
  // console.log("TimeBondingCalculator deployed to:", TimeBondingCalculator.address);

  // var TimeBondDepository = await hre.ethers.getContractFactory("TimeBondDepository");
  // TimeBondDepository = await TimeBondDepository.deploy(Time.address, mebAddress,
  //   TimeTreasury.address, 
  //   myAddress, 
  //   TimeBondingCalculator.address);
  // await TimeBondDepository.deployed();
  // console.log("TimeBondDepository deployed to:", TimeBondDepository.address);

  var TimeStaking = await hre.ethers.getContractFactory("TimeStaking");
  TimeStaking = await TimeStaking.deploy(Time.address, MEMOries.address,
    epochLength, 
    firstEpochNumber, 
    firstEpochTime);
  await TimeStaking.deployed();
  console.log("TimeStaking deployed to:", TimeStaking.address);

  var StakingHelper = await hre.ethers.getContractFactory("StakingHelper");
  StakingHelper = await StakingHelper.deploy(TimeStaking.address, Time.address);
  await StakingHelper.deployed();
  console.log("StakingHelper deployed to:", StakingHelper.address);

  var StakingWarmup = await hre.ethers.getContractFactory("StakingWarmup");
  StakingWarmup = await StakingWarmup.deploy(TimeStaking.address, MEMOries.address);
  await StakingWarmup.deployed();
  console.log("StakingWarmup deployed to:", StakingWarmup.address);
  
  var Distributor = await hre.ethers.getContractFactory("Distributor");
  Distributor = await Distributor.deploy(TimeTreasury.address, Time.address, epochLength, nextEpochTime);
  await Distributor.deployed();
  console.log("Distributor deployed to:", Distributor.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
