const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Buy me a coffee", () => {
  let contract;
  let owner, addr1, addr2;

  before(async () => {
    const Contract = await ethers.getContractFactory("BuyMeACoffee");
    contract = await Contract.deploy();
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("should by a coffee", async () => {
    await expect(
      contract.connect(addr1).buyCoffee("name_1", "message_1", { value: 1000 })
    ).to.changeEtherBalances([contract.address, addr1.address], [1000, -1000]);
  });

  it("should withdraw", async () => {
    await expect(contract.withdraw()).to.changeEtherBalances(
      [contract.address, owner.address],
      [-1000, 1000]
    );
  });
});
