import { ethers } from "ethers";
import { EthereumProvider } from "hardhat/types"

function getEth(): EthereumProvider {
  // @ts-expect-error window is not defined
  const eth = window.ethereum as EthereumProvider;
  if (!eth) {
    throw new Error("get metamask and a positive attitude");
  }
  return eth;
}

export async function hasAccounts(): Promise<boolean> {
  try {
    const eth = getEth();
    const accounts = (await eth.request({ method: "eth_accounts" })) as string[];
    return accounts && accounts.length > 0;
  } catch (error) {
    throw error;
  }
}

async function requestAccounts(): Promise<boolean> {
  const eth = getEth();
  const accounts = (await eth.request({
    method: "eth_requestAccounts",
  })) as string[];
  return accounts && accounts.length > 0;
}

export async function connectWallet() {
  if (!getEth()) {
    throw new Error("No ethereum provider found");
  }

  try {
    if (!(await hasAccounts())) {
      if (!(await requestAccounts())) {
        throw new Error("No accounts found/permitted");
      }
    }
    const provider = new ethers.BrowserProvider(getEth());
    const signer = await provider.getSigner();
    const walletAddress = await signer.getAddress();

    return { provider, signer, walletAddress };
  } catch (error) {
    throw error;
  }
}
