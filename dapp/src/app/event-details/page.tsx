"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, DollarSign } from 'lucide-react';

// Event interface to define event structure
interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  ticketPrice: number;
  description: string;
  imageUrl: string;
  totalTickets: number;
  availableTickets: number;
}

// EventCard Component
const EventCard: React.FC<{ event: Event; onBuyTicket: (eventId: string) => void }> = ({ 
  event, 
  onBuyTicket 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105">
      <div className="relative h-48 w-full">
        <Image 
          src={event.imageUrl} 
          alt={event.name} 
          fill 
          className="object-cover"
        />
      </div>
      
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-bold text-gray-800">{event.name}</h3>
        
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="w-5 h-5 text-blue-500" />
          <span>{new Date(event.date).toLocaleString()}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-600">
          <MapPin className="w-5 h-5 text-blue-500" />
          <span>{event.location}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-600">
          <DollarSign className="w-5 h-5 text-blue-500" />
          <span>{event.ticketPrice} ETH</span>
        </div>
        
        <div className="text-sm text-gray-500">
          Available Tickets: {event.availableTickets}/{event.totalTickets}
        </div>
        
        <button 
          onClick={() => onBuyTicket(event.id)}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={event.availableTickets === 0}
        >
          {event.availableTickets > 0 ? 'Buy Ticket' : 'Sold Out'}
        </button>
      </div>
    </div>
  );
};

// EventGrid Component
const EventGrid: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated fetch events function (replace with actual API call)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // TODO: Replace with actual API endpoint
        const mockEvents: Event[] = [
          {
            id: '1',
            name: 'Summer Music Festival',
            date: '2024-07-15T19:00:00',
            location: 'City Park, New York',
            ticketPrice: 0.5,
            description: 'Annual summer music celebration',
            imageUrl: '/api/placeholder/400/300',
            totalTickets: 1000,
            availableTickets: 750
          },
          {
            id: '2',
            name: 'Tech Conference 2024',
            date: '2024-09-20T09:00:00',
            location: 'Convention Center, San Francisco',
            ticketPrice: 1.2,
            description: 'Leading technology conference',
            imageUrl: '/api/placeholder/400/300',
            totalTickets: 500,
            availableTickets: 250
          }
        ];

        setEvents(mockEvents);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch events', error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleBuyTicket = (eventId: string) => {
    // TODO: Implement ticket purchase logic
    console.log(`Buying ticket for event ${eventId}`);
  };

  if (isLoading) {
    return <div className="text-center text-xl">Loading events...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            onBuyTicket={handleBuyTicket} 
          />
        ))}
      </div>
    </div>
  );
};

export default EventGrid;