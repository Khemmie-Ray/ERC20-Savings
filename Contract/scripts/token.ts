import { ethers } from "hardhat";

async function main() {

  const w3b = await ethers.deployContract("W3b", ["0xdF0a689A22B64C455AE212DBc13AF35f1B1dFD55"]) 

  await w3b.waitForDeployment();

  console.log(
    ` W3b was deployed to ${w3b.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
