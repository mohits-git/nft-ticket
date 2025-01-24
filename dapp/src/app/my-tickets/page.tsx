"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, RefreshCw } from 'lucide-react';

// Ticket NFT Interface
interface TicketNFT {
  id: string;
  eventName: string;
  eventDate: string;
  location: string;
  ticketPrice: number;
  imageUrl: string;
  perks: string[];
  tokenId: string;
  contractAddress: string;
}

// TicketCard Component
const TicketCard: React.FC<{ ticket: TicketNFT; onResell?: (tokenId: string) => void }> = ({ 
  ticket, 
  onResell 
}) => {
  return (
    <div className="bg-gray-900 rounded-lg border-2 border-pink-500 overflow-hidden 
      transform transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]
      font-['Orbitron']">
      <div className="relative h-48 w-full">
        <Image 
          src={ticket.imageUrl} 
          alt={ticket.eventName} 
          fill 
          className="object-cover brightness-75 hover:brightness-100 transition-all"
        />
      </div>
      
      <div className="p-4 space-y-2 text-gray-200">
        <h3 className="text-xl font-bold text-pink-400">{ticket.eventName}</h3>
        
        <div className="flex items-center space-x-2 text-gray-400">
          <Calendar className="w-5 h-5 text-blue-400" />
          <span>{new Date(ticket.eventDate).toLocaleString()}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-400">
          <MapPin className="w-5 h-5 text-green-400" />
          <span>{ticket.location}</span>
        </div>
        
        {ticket.perks && ticket.perks.length > 0 && (
          <div className="mt-2">
            <h4 className="text-sm font-semibold text-gray-300">Ticket Perks:</h4>
            <ul className="list-disc list-inside text-sm text-gray-500">
              {ticket.perks.map((perk, index) => (
                <li key={index}>{perk}</li>
              ))}
            </ul>
          </div>
        )}
        
        {onResell && (
          <button 
            onClick={() => onResell(ticket.tokenId)}
            className="w-full mt-4 bg-pink-600 text-white py-2 rounded-lg 
              hover:bg-pink-700 transition-all duration-300 
              shadow-lg shadow-pink-500/50 hover:shadow-pink-500/70
              transform hover:-translate-y-1"
          >
            <RefreshCw className="inline-block mr-2 h-4 w-4" />
            Resell Ticket
          </button>
        )}
      </div>
    </div>
  );
};

// MyTickets Component
const MyTickets: React.FC = () => {
  const [tickets, setTickets] = useState<TicketNFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserTickets = async () => {
      try {
        const mockTickets: TicketNFT[] = [
          {
            id: '1',
            eventName: 'Summer Music Festival',
            eventDate: '2024-07-15T19:00:00',
            location: 'City Park, New York',
            ticketPrice: 0.5,
            imageUrl: '/api/placeholder/400/300',
            perks: [
              'VIP Access',
              'Free Drink',
              'Exclusive Merchandise'
            ],
            tokenId: 'nft-123',
            contractAddress: '0x...'
          },
          {
            id: '2',
            eventName: 'Tech Conference 2024',
            eventDate: '2024-09-20T09:00:00',
            location: 'Convention Center, San Francisco',
            ticketPrice: 1.2,
            imageUrl: '/api/placeholder/400/300',
            perks: [
              'Speaker Meet & Greet',
              'Workshop Access'
            ],
            tokenId: 'nft-456',
            contractAddress: '0x...'
          }
        ];

        setTickets(mockTickets);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch tickets', error);
        setIsLoading(false);
      }
    };

    fetchUserTickets();
  }, []);

  const handleResellTicket = (tokenId: string) => {
    console.log(`Initiating resale for ticket ${tokenId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center 
        text-xl text-pink-400 font-['Orbitron']">
        Loading your tickets...
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-12 px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-pink-400 font-['Orbitron']">
        My Tickets
      </h2>
      {tickets.length === 0 ? (
        <div className="text-center text-gray-500 font-['Orbitron']">
          You haven`&apos;`t purchased any tickets yet.
        </div>
      ) : (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tickets.map(ticket => (
            <TicketCard 
              key={ticket.id} 
              ticket={ticket} 
              onResell={handleResellTicket} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;