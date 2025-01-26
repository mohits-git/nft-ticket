import { ethers } from "ethers";
import { abi as CONTRACT_ABI } from "./NFTicket-abi.json";
import { Event } from "@/utils/types";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '';

export async function createEvent(signer: ethers.Signer, eventDetails: Omit<Event, 'id' | 'expired' | 'availableTickets' | 'imageUrl'>) {
  try {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    // Call the createEvent function
    const tx = await contract.createEvent(
      eventDetails.name,
      eventDetails.description,
      eventDetails.date,
      ethers.parseEther(eventDetails.ticketPrice.toString()),
      eventDetails.totalTickets,
      { gasLimit: 300000 } // Optional: specify gas limit
    );

    console.log("Transaction sent:", tx.hash);
    const receipt = await tx.wait();
    if (receipt.status !== 1) {
      throw new Error("Transaction failed");
    }

    console.log("Event created successfully:", tx);

    return tx;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}
