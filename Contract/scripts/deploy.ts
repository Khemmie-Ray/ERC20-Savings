import { ethers } from "hardhat";

async function main() {

  const saveERC20 = await ethers.deployContract("SaveERC20", ["0xe25327d529a722BB05ca7cc495528e2CB2Da520F"]);

  await saveERC20.waitForDeployment();

  console.log(
    `SaveERC20 was deployed to ${saveERC20.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
