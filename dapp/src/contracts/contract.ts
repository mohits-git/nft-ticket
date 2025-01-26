import { ethers } from "ethers";
import { abi as CONTRACT_ABI } from "./NFTicket-abi.json";
import { Event } from "@/utils/types";
import { connectWallet } from "@/wallet/connect";
import { toast } from "sonner";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '';

interface ContractEvent {
  metadataURI: string;
  price: ethers.BigNumberish;
  maxTickets: ethers.BigNumberish;
  ticketsSold: ethers.BigNumberish;
  organizer: string;
}

interface EventMetadata {
  name: string;
  description: string;
  date: string;
  location: string;
  ticketPrice: string;
  totalTickets: string;
  imageUrl: string;
}

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
      location: eventDetails.location,
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

async function fetchAllEvents() {
  try {
    // Call the getAllEvents function from the smart contract
    const { provider } = await connectWallet();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    const events = await contract.getAllEvents();

    // Process events
    const formattedEvents = events.map((event: ContractEvent, index: number) => {
      const availableTickets = Number(event.maxTickets) - Number(event.ticketsSold);
      return {
        id: index,
        metadataURI: event.metadataURI,
        price: ethers.formatEther(event.price), // Convert price from wei to ETH
        maxTickets: event.maxTickets.toString(),
        availableTickets: availableTickets.toString(),
        organizer: event.organizer
      }
    });

    console.log("Fetched Events:", formattedEvents);
    return formattedEvents;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

async function fetchEventMetadata(metadataURI: string): Promise<EventMetadata | null> {
  try {
    const response = await fetch(metadataURI);
    if (!response.ok) throw new Error("Failed to fetch metadata");
    const metadata = await response.json();
    console.log("Fetched Metadata:", metadata);
    return metadata;
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null;
  }
}

// Combine on-chain and off-chain data
export async function getAllEventDetails() {
  const events = await fetchAllEvents();
  const eventDetails = await Promise.all(
    events.map(async (event: ContractEvent) => {
      const metadata = await fetchEventMetadata(event.metadataURI);
      if (!metadata) return null;
      return {
        ...event,
        ...metadata
      };
    })
  );

  console.log("Detailed Events:", eventDetails);
  return eventDetails;
}

export async function getEventDetails(eventId: number) {
  try {
    // Call the getAllEvents function from the smart contract
    const { provider } = await connectWallet();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    const event = await contract.getEventDetails(BigInt(eventId));
    const availableTickets = Number(event.maxTickets) - Number(event.ticketsSold);
    const metadata = await fetchEventMetadata(event.metadataURI);
    if (!metadata) return null;
    console.log("Event Details Page");
    console.log(event)
    console.log("--------------------------");
    return {
      ...event,
      ...metadata,
      availableTickets: availableTickets,
    };
  } catch (error) {
    console.log(error)
    return null;
  }
}

export async function buyTicket(eventId: string, ticketPrice: number) {
  try {
    // Connect to the user's wallet
    const { signer } = await connectWallet();

    // Get the contract instance
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    console.log("Buying ticket for event:", eventId);
    // Call the mintTicket function
    const tx = await contract.mintTicket(eventId, {
      value: ethers.parseEther(ticketPrice.toString()), // Send ticket price in ETH
    });

    console.log("Transaction sent:", tx.hash);

    // Wait for the transaction to be confirmed
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);

    toast.success("Ticket purchased successfully!");
  } catch (error) {
    // @ts-expect-error error is an object
    toast.error("Failed to purchase ticket. Please try again.", error.message);
    throw error;
  }
}

