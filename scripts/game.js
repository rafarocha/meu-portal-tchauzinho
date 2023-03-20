const main = async () => {
    const [owner, p1, p2, p3] = await hre.ethers.getSigners();
    const wallets = [owner, p1, p2, p3];
    const factory = await hre.ethers.getContractFactory("GamePoint");
    const contract = await factory.deploy();
    await contract.deployed();
  
    console.log("Contract deployed to:", contract.address);
    console.log("Contract deployed by:", owner.address);
    console.log("");

    // start random game
    console.log("Starting game ...\n");
    let index, wallet, max;
    for(i=0; i < 5; i++) {
      index = await contract.getRandom(wallets.length);
      walle = wallets[index];
      console.log("\n%s index", index);
      await balance(contract, walle);
      max = await contract.getRandom(11);
      for(j=0; j < max; j++) {
          await point(contract, walle);
      }
      await balance(contract, walle);
    }

    // winner
    await winner(contract, wallets);

    console.log("\nfinish");
};

const winner = async (contract, wallets) => {
    let index = 0, balance = 0, maxBalance = 0, maxAddress = null;
    for(i=0; i < wallets.length; i++) {      
        balance = await contract.getBalance(wallets[i].address);
        if (balance > maxBalance) {
            maxBalance = balance;
            maxAddress = wallets[i];
            index = i;
        }
    }
    console.log("\nwinner %s index %s balance = %s", index, maxBalance, maxAddress.address); 
}

const balance = async (contract, wallet) => {
    await contract.getBalance(wallet.address)
        .then(balance => console.log("%s = %s", balance, wallet.address))
        .catch(error => console.error(error));
}

const point = async (contract, wallet) => {
    await contract.point(wallet.address);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
  
runMain();