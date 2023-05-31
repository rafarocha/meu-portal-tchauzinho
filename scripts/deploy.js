const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
  
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());
  
    const tokenG = await hre.ethers.getContractFactory("GamePoint");
    const game = await tokenG.deploy();
    await game.deployed();
    console.log("GamePoint address: ", game.address);

    const token = await hre.ethers.getContractFactory("WavePortal");
    const portal = await token.deploy({
        value: hre.ethers.utils.parseEther("0.001"),
    });

    await portal.deployed();
    console.log("WavePortal address: ", portal.address);
};
  
const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
  
runMain();