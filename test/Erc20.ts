import { expect } from "chai";
import hre from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("Vaska", function (){
  let erc20Token: ERC20;
  let owner: SignerWithAddress
  let addr1: SignerWithAddress
  let addr2: SignerWithAddress

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    const ERC20Token = await hre.ethers.getContractFactory("Vaska", {signer: owner});
    erc20Token = await ERC20Token.deploy();
    console.log("Owner", owner.address);
    console.log("Addr2", addr2.address);
  });

  // describe("Check contract constructor", () => {
  //    it("Should mint 1000 BTC tokes", async function () {
  //      const mint_amount = BigInt(10 * 10 ** 18);
  //      const balance = await erc20Token.balanceOf(owner.address);
  //      console.log(balance);
  //      expect(await balance).to.equal(mint_amount);
  //    });
  //  });

  describe("Check mint function with Owner modifier", () => {
    it("Call mint function from different address", async function () {
      await expect(erc20Token.connect(addr2).mint(addr2.address, BigInt(10 * 10 ** 18))).to.be.revertedWith("Ownable: caller is not the owner");

    });
  });

   describe("Check renounceOwnership function", () => {
     it("Check owner equzl to 0x00 address", async function () {
       await erc20Token.renounceOwnership();
       owner = await erc20Token.owner();
       expect(owner).to.equal(ethers.constants.AddressZero);
     });
   });

   describe("Check transferOwnership function", () => {
     it("Check addr2 ad new owner",  async function () {
       await erc20Token.transferOwnership(addr2.address);
       owner = await erc20Token.owner();
       expect(owner).to.equal(addr2.address);
     });
     it("Check function failed with 0x00 address", async function () {
       await expect(erc20Token.transferOwnership(ethers.constants.AddressZero)).to.be.revertedWith("Ownable: new owner is the zero address");
     });
   });
});
