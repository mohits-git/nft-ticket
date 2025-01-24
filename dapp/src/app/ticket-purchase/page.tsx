"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, DollarSign, Ticket } from 'lucide-react';

// Event Interface
interface EventDetails {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  ticketPrice: number;
  totalTickets: number;
  availableTickets: number;
}

// Mock Event Data
const eventData: EventDetails = {
  id: 'event-001',
  name: 'Summer Music Festival 2024',
  date: '2024-08-15T19:00:00',
  location: 'Riverside Park, New York',
  description: 'An epic summer music festival featuring top international artists across multiple stages.',
  imageUrl: '/api/placeholder/800/400',
  ticketPrice: 0.5,
  totalTickets: 1000,
  availableTickets: 750
};

// Event Details Component
const EventDetails: React.FC<{ event: EventDetails }> = ({ event }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-8 font-['Orbitron']">
      {/* Event Image */}
      <div className="relative h-96 w-full">
        <Image 
          src={event.imageUrl} 
          alt={event.name} 
          fill 
          className="object-cover rounded-lg border-2 border-pink-500 
          brightness-75 hover:brightness-100 transition-all 
          shadow-[0_0_20px_rgba(236,72,153,0.5)]"
        />
      </div>
      
      {/* Event Information */}
      <div className="space-y-4 text-gray-200">
        <h1 className="text-3xl font-bold text-pink-400">{event.name}</h1>
        
        <div className="flex items-center space-x-3 text-gray-400">
          <Calendar className="h-6 w-6 text-blue-400" />
          <span className="text-lg">
            {new Date(event.date).toLocaleString('en-US', {
              dateStyle: 'full',
              timeStyle: 'short'
            })}
          </span>
        </div>
        
        <div className="flex items-center space-x-3 text-gray-400">
          <MapPin className="h-6 w-6 text-green-400" />
          <span className="text-lg">{event.location}</span>
        </div>
        
        <p className="text-gray-300 leading-relaxed">
          {event.description}
        </p>
      </div>
    </div>
  );
};

// Purchase Section Component
const PurchaseSection: React.FC<{ 
  event: EventDetails, 
  onPurchase: (quantity: number) => void 
}> = ({ event, onPurchase }) => {
  const [quantity, setQuantity] = useState(1);

  const handlePurchase = () => {
    onPurchase(quantity);
  };

  return (
    <div className="bg-gray-900 border-2 border-blue-500 rounded-lg p-6 font-['Orbitron'] shadow-[0_0_20px_rgba(59,130,246,0.5)]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <DollarSign className="h-6 w-6 text-purple-400" />
          <span className="text-xl font-semibold text-gray-200">
            {event.ticketPrice} ETH per ticket
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Ticket className="h-6 w-6 text-cyan-400" />
          <span className="text-lg text-gray-300">
            {event.availableTickets} / {event.totalTickets} Tickets Available
          </span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 mb-4">
        <label htmlFor="quantity" className="text-gray-300">Quantity:</label>
        <input
          type="number"
          id="quantity"
          min="1"
          max={event.availableTickets}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="w-20 px-2 py-1 bg-gray-800 text-gray-200 border-2 border-transparent focus:border-blue-500 rounded"
        />
      </div>
      
      <button
        onClick={handlePurchase}
        disabled={event.availableTickets === 0}
        className="w-full bg-pink-600 text-white py-3 rounded-lg 
        hover:bg-pink-700 transition-all duration-300 
        shadow-lg shadow-pink-500/50 hover:shadow-pink-500/70
        transform hover:-translate-y-1 
        disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {event.availableTickets > 0 ? 'Purchase Tickets' : 'Sold Out'}
      </button>
    </div>
  );
};

// Main Ticket Purchase Page
const TicketPurchasePage: React.FC = () => {
  const handleTicketPurchase = (quantity: number) => {
    console.log(`Purchasing ${quantity} ticket(s) for event`);
  };

  return (
    <div className="bg-black min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <EventDetails event={eventData} />
        <PurchaseSection 
          event={eventData} 
          onPurchase={handleTicketPurchase} 
        />
      </div>
    </div>
  );
};

export default TicketPurchasePage;