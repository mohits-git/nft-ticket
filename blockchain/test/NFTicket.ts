import { NFTicket } from "../typechain-types";
import { ethers } from "hardhat";
import { expect } from "chai";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("NFTicket", function () {
  let nfticket: NFTicket,
    owner: HardhatEthersSigner,
    organizer: HardhatEthersSigner,
    buyer: HardhatEthersSigner;

  beforeEach(async function () {
    // Deploy the contract
    [owner, organizer, buyer] = await ethers.getSigners();
    const contractFactory = await ethers.getContractFactory("NFTicket");
    nfticket = await contractFactory.deploy(owner);
    await nfticket.waitForDeployment();
    await nfticket.addOrganizer(organizer.address);
  });

  // approve organizer
  it("Should allow the owner to approve an organizer", async function () {
    const isOrganizer = await nfticket.isOrganizer(organizer.address);
    expect(isOrganizer).to.be.true;
  });

  it("Should set the deployer as the platform wallet", async function () {
    const platformWallet = await nfticket.platformWallet();
    expect(platformWallet).to.equal(owner.address);
  });

  it("Should allow the owner to update the platform wallet", async function () {
    await nfticket.updatePlatformWallet(organizer.address);
    const platformWallet = await nfticket.platformWallet();
    expect(platformWallet).to.equal(organizer.address);
  });

  it("Should create an event and mint a ticket", async function () {
    // Organizer creates an event
    const eventPrice = ethers.parseEther("0.05");
    const maxTickets = 5;

    await nfticket
      .connect(organizer)
      .createEvent(
        "Test Event",
        new Date().toLocaleString(),
        "jaipur",
        eventPrice,
        maxTickets
      );

    // Buyer purchases a ticket
    const tokenURI = "https://example.com/metadata.json";
    await nfticket
      .connect(buyer)
      .mintTicket(0, tokenURI, { value: eventPrice });

    // Validate ticket ownership and event stats
    expect(await nfticket.ownerOf(1)).to.equal(buyer.address);
    const eventDetails = await nfticket.events(0);
    expect(eventDetails.ticketsSold).to.equal(1);
  });

  it("Should distribute platform fees and organizer share correctly", async function () {
    // Organizer creates an event
    const eventPrice = ethers.parseEther("1"); // 1 ETH ticket price
    const maxTickets = 5;
    await nfticket
      .connect(organizer)
      .createEvent(
        "Test Event",
        new Date().toLocaleString(),
        "jaipur",
        eventPrice,
        maxTickets
      );

    // Initial balances
    const platformWalletBalanceBefore = await ethers.provider.getBalance(
      owner.address
    );
    const organizerBalanceBefore = await ethers.provider.getBalance(
      organizer.address
    );

    // Buyer purchases a ticket
    const tokenURI = "https://example.com/metadata.json";
    const tx = await nfticket
      .connect(buyer)
      .mintTicket(0, tokenURI, { value: eventPrice });
    const receipt = await tx.wait();
    if (!receipt) {
      throw new Error("Transaction failed");
    }
    // const gasUsed = receipt ? receipt.gasUsed * tx.gasPrice : 0;

    // Validate balances after transaction
    const platformFee = eventPrice / BigInt(1000); // 5% fee
    const organizerShare = eventPrice - platformFee;

    const platformWalletBalanceAfter = await ethers.provider.getBalance(
      owner.address
    );
    const organizerBalanceAfter = await ethers.provider.getBalance(
      organizer.address
    );

    expect(platformWalletBalanceAfter - platformWalletBalanceBefore).to.equal(
      platformFee
    );
    expect(organizerBalanceAfter - organizerBalanceBefore).to.equal(
      organizerShare
    );
  });

  it("Should reject ticket purchases with insufficient payment", async function () {
    // Organizer creates an event
    const eventPrice = ethers.parseEther("0.1");
    const maxTickets = 5;
    await nfticket
      .connect(organizer)
      .createEvent(
        "Test Event",
        new Date().toLocaleString(),
        "jaipur",
        eventPrice,
        maxTickets
      );

    // Attempt to mint a ticket with insufficient payment
    const tokenURI = "https://example.com/metadata.json";
    await expect(
      nfticket
        .connect(buyer)
        .mintTicket(0, tokenURI, { value: ethers.parseEther("0.05") })
    ).to.be.revertedWith("Insufficient payment");
  });

  it("Should reject ticket purchases when tickets are sold out", async function () {
    // Organizer creates an event
    const eventPrice = ethers.parseEther("0.1");
    const maxTickets = 1; // Only 1 ticket available
    await nfticket
      .connect(organizer)
      .createEvent(
        "Test Event",
        new Date().toLocaleString(),
        "jaipur",
        eventPrice,
        maxTickets
      );

    // Buyer purchases the only ticket
    const tokenURI = "https://example.com/metadata.json";
    await nfticket
      .connect(buyer)
      .mintTicket(0, tokenURI, { value: eventPrice });

    // Another buyer attempts to buy a ticket
    await expect(
      nfticket.connect(buyer).mintTicket(0, tokenURI, { value: eventPrice })
    ).to.be.revertedWith("All tickets sold");
  });
});
