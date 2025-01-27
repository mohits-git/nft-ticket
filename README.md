# NFTicket

NFTicket is a decentralized ticketing platform that allows event organizers to create, sell, and manage event tickets on the blockchain. NFTicket leverages the power of non-fungible tokens (NFTs) to create unique, verifiable, and secure tickets that cannot be duplicated or counterfeited. By using NFTs, event organizers can ensure that each ticket is one-of-a-kind and that it represents a specific seat or entry to an event.

## Features

- Create new events by approved organizers only.
  - Organizers can set the event name, date, time, location, ticket price, and the number of tickets available.
  - Organizers can also upload an image for the event, which will be stored on IPFS (by Pinata).
  - Each event is represented by an NFT, which is minted when the a user buys a ticket.
  - The NFT contains metadata such as the event name, date, time, location, and image.
  - The ticket price is set in ETH, when a user buys a ticket, the ETH is transferred to the organizer's wallet, deducting the platform fee of 0.1% of ticket price.
- Buy tickets for events.
  - Users can buy tickets for events by connecting their MetaMask wallet. 
  - When a user buys a ticket, the NFT representing the event is minted and transferred to the user's wallet.
> Only approved organizers can create events and sell tickets. Right now the organizers approval is done manually by the admin.

## Tech Stack

- **Frontend**: 
    - React(Next.js)
    - Tailwind CSS
    - ethers.js
- **Backend/Blockchain**: 
    - Solidity
    - Hardhat
    - Ethers.js
    - IPFS (by Pinata)
    - MetaMask (for wallet integration)
    - Clerk (for authentication)

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/mohits-git/nft-ticket.git
```

2. Install the dependencies:

```bash
cd nft-ticket
# client
cd dapp
npm install
# server
cd blockchain
npm install
```

3. Start the local blockchain network:

```bash
cd blockchain
npx hardhat node
```

4. Deploy the smart contracts to the local network:

```bash
cd blockchain
npx hardhat run scripts/deploy.js --network localhost
```
> Copy the smart contract address and add it to your `.env` file in the `dapp` directory.
> You can also deploy the smart contract to your preferred network by updating the `hardhat.config.js` file.

5. Environment variables setup:

```bash
cd dapp
cp .env.example .env
```
> Add the following environment variables to the `.env` file:
```
# Clerk auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# smart contract
NEXT_PUBLIC_CONTRACT_ADDRESS=

# IPFS (Pinata)
PINATA_JWT=
NEXT_PUBLIC_GATEWAY_URL=
```

6. Start the frontend:

```bash
cd dapp
npm run dev
```

7. Open your browser and navigate to `http://localhost:3000` to view the application.

## Future Work/Improvements

- Deploy to the cost-effective and scalable blockchain network (e.g., Polygon, Binance Smart Chain).
- Add support for more blockchains.
- Implement a more robust authentication system for organizers.
- Add support for multiple ticket types (e.g., VIP, General Admission).
- Allow organizers to set custom metadata for events.
- Add support for event reminders and notifications.
- Implement a refund system for canceled events.
- Add support for event reviews and ratings.
- Improve the UI/UX of the application.
