const hre = require("hardhat");

async function main() {
    console.log("Starting token deployment...");

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with account:", deployer.address);
    console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy(
        "MyToken",
        "MTK",
        ethers.parseEther("1000000")
    );

    await token.waitForDeployment();
    const tokenAddress = await token.getAddress();

    console.log("MyToken deployed to:", tokenAddress);

    console.log("\nNext steps:");
    console.log("1. Verify contract on Etherscan:");
    console.log(`   npx hardhat verify --network ${hre.network.name} ${tokenAddress} "MyToken" "MTK" "${ethers.parseEther("1000000")}"`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });