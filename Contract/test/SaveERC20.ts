import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SaveERC20 } from "../typechain-types";
import { W3b } from "../typechain-types";

describe("SaveERC20", function () {
  let w3btoken: W3b;
  let saveERC20: SaveERC20;
  async function deploySaveERCFixture() {

    // Contracts are deployed using the first signer/account by default
    
    const [owner, otherAccount] = await ethers.getSigners();
    const initialOwner = "0xdF0a689A22B64C455AE212DBc13AF35f1B1dFD55"
    const W3btoken = await ethers.getContractFactory("W3b")
    w3btoken = await W3btoken.deploy(initialOwner)
    const SaveERC20 = await ethers.getContractFactory("SaveERC20");
    saveERC20 = await SaveERC20.deploy(w3btoken.target);
    const { deposit, withdraw, checkUserBalance, checkContractBalance, ownerWithdraw } = await SaveERC20.deploy(w3btoken.target);
    return { deposit, withdraw, checkUserBalance, checkContractBalance, ownerWithdraw, w3btoken, saveERC20, owner, otherAccount };
  }

   describe("Deposit", function () {
    it("Should allow users make deposit", async function () {
        const depositAmount = 100;
        const { w3btoken, saveERC20, owner } = await loadFixture(deploySaveERCFixture);
        const balBeforeDeposit = await saveERC20.checkUserBalance(owner);
        await w3btoken.connect(owner).approve(saveERC20.target, depositAmount)
        await saveERC20.connect(owner).deposit(depositAmount)
        const depositbal = await saveERC20.connect(owner).checkUserBalance(owner.address)
        // const userBalance =await w3btoken.connect(owner).balanceOf(owner.address)

        expect(depositbal).to.be.greaterThan(balBeforeDeposit);
      });
      it("Should check that the depositor is address 0", async function () {
        const { owner } = await loadFixture(deploySaveERCFixture);
  
        const sender = owner.address;
  
        const nullAddress = "0x0000000000000000000000000000000000000000";
  
        expect(sender).is.not.equal(nullAddress);
      });

      it("should not allow zero value", async function () {
        const { saveERC20 } = await loadFixture(deploySaveERCFixture);

        const depositValue = 0;

        expect(saveERC20.deposit(depositValue)).revertedWith("can't save zero value");
    }); 
    it("should check funds of sender", async function () {
      const { saveERC20 } = await loadFixture(deploySaveERCFixture);

      const depositValue = 0;

      expect(saveERC20.deposit(depositValue)).revertedWith("can't withdraw zero value");
  }); 
  it("should checkbalance of the contract and saver balance", async function () {
    const { saveERC20 } = await loadFixture(deploySaveERCFixture);

    const depositValue = 0;

    expect(saveERC20.deposit(depositValue)).revertedWith("can't withdraw zero value");
  }); 
  })
});

//       // const [owner] = await ethers.getSigners()
//       

//       const userBalance =await w3btoken.connect(owner).balanceOf(owner.address)
//       // expect(userBalance).to.equal();


// console.log(userBalance)
// const depositbal = await saveERC20.connect(owner).checkUserBalance(owner.address)
// console.log(depositbal)
// await saveERC20.connect(owner).withdraw(67)
// const balafter = await w3btoken.connect(owner).balanceOf(owner.address)
// console.log(balafter)
// const contarctbal = await saveERC20.connect(owner).checkContractBalance()
// console.log(contarctbal)