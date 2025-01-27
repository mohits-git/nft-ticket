import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import { NFTicket } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer public address:", deployer.address);
  const NFTicket = await ethers.getContractFactory("NFTicket");
  const nfticket = (await NFTicket.deploy(deployer.address)) as NFTicket;
  await nfticket.waitForDeployment();
  console.log("(CONTRACT_ADDRESS) NFTicket deployed to:", await nfticket.getAddress());
  await nfticket.addOrganizer(deployer.address);
}

main().then(console.log).catch(console.error);

async function deploy() {
  // Deploy the contract
  const [owner, organizer, buyer] = await ethers.getSigners();
  
  console.log('Owner: ', owner.address);
  console.log('Organizer: ', organizer.address);
  console.log('Buyer: ', buyer.address);

  const contractFactory = await ethers.getContractFactory("NFTicket");
  const nfticket = await contractFactory.deploy(owner);
  await nfticket.waitForDeployment();
  await nfticket.addOrganizer(organizer.address);

  const isOrganizer = await nfticket.isOrganizer(organizer.address);
  console.log("Is ", organizer.address ," organizer: ", isOrganizer);

  const platformWallet = await nfticket.platformWallet();
  console.log("Platform wallet: ", platformWallet);

    const eventPrice = ethers.parseEther("5");
    const maxTickets = 5;

  // TODO: change
    await nfticket
      .connect(organizer)
      .createEvent(
        "Test Event",
        new Date().toLocaleString(),
        "jaipur",
        eventPrice,
        maxTickets,
        
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
      .mintTicket(0, { value: eventPrice });
    const receipt = await tx.wait();
    if (!receipt) {
      throw new Error("Transaction failed");
    }

    // Validate ticket ownership and event stats
    const ticketOwner = await nfticket.ownerOf(1);
    console.log("Ticket owner: ", ticketOwner, " Buyer: ", buyer.address);
    const eventDetails = await nfticket.events(0);
    console.log("Event details: ", eventDetails);

        // Validate balances after transaction
    const platformFee = eventPrice / BigInt(1000); // 5% fee
    const organizerShare = eventPrice - platformFee;

    const platformWalletBalanceAfter = await ethers.provider.getBalance(
      owner.address
    );
    const organizerBalanceAfter = await ethers.provider.getBalance(
      organizer.address
    );

    console.log("Platform wallet balance before: ", platformWalletBalanceBefore.toString());
    console.log("Platform wallet balance after: ", platformWalletBalanceAfter.toString());
    console.log("Platform Fee", platformFee.toString());
    console.log("Organizer balance before: ", organizerBalanceBefore.toString());
    console.log("Organizer balance after: ", organizerBalanceAfter.toString());
    console.log("Organizer share: ", organizerShare.toString());
}

// deploy().catch(console.error);
