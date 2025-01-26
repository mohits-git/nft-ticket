import { ethers } from "ethers";
import { abi as CONTRACT_ABI } from "./NFTicket-abi.json";
import { Event } from "@/utils/types";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '';

export async function createEvent(signer: ethers.Signer, eventDetails: Omit<Event, 'id' | 'expired' | 'availableTickets' | 'imageUrl'>, image: File) {
  try {
    // Upload image to IPFS
    const formData = new FormData();
    formData.append('file', image);
    const res = await fetch('/api/files', {
      method: 'POST',
      body: formData
    });
    if (!res.ok) {
      throw new Error('Failed to upload image');
    }
    const { fileUrl: imageUrl } = await res.json();

    // Upload metadata to IPFS
    const metadata = {
      name: eventDetails.name,
      description: eventDetails.description,
      date: eventDetails.date,
      ticketPrice: eventDetails.ticketPrice,
      totalTickets: eventDetails.totalTickets,
      imageUrl: imageUrl
    };

    const metadataRes = await fetch('/api/json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(metadata)
    });
    if (!metadataRes.ok) {
      throw new Error('Failed to upload metadata');
    }
    const { jsonUrl: metadataUrl } = await metadataRes.json();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    // Call the createEvent function
    const tx = await contract.createEvent(
      metadataUrl,
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
