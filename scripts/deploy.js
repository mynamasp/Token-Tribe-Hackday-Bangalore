// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    const TokenTribe = await hre.ethers.getContractFactory("TokenTribe");
    const tokenTribe = await TokenTribe.deploy(5, 82);

    await tokenTribe.deployed();

    console.log(
        `Contract with minimum purchase of (5 tokens) and (1 USD -> 82 INR) is deployed to ${tokenTribe.address}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
