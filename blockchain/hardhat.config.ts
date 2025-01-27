import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  //networks: {
    //  polygon_amoy: {
    //    url: "https://polygon-amoy.g.alchemy.com/v2/xpPc6MK390j2YGn1pG-Ad2ORtgQHTuPI",
    //    accounts: [process.env.PRIVATE_KEY || '']
    //  }
    //sepolia: {
    //  url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    //  accounts: [process.env.PRIVATE_KEY || '']
    //}
  //},
};

export default config;
