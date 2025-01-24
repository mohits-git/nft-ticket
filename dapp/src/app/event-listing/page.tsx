"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, DollarSign } from 'lucide-react';
import {eventMockData} from '../../utils/Events'
import BuyTicket from '@/components/BuyTicket';
// Event interface to define event structure
import { Event } from '@/utils/types';

// EventCard Component
const EventCard: React.FC<{ event: Event }> = ({ 
  event,  
}) => {
  return (
    <div className="bg-gray-900 rounded-lg border-2 border-pink-500 overflow-hidden 
      transform transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]
      font-['Orbitron']">
      <div className="relative h-48 w-full">
        <Image 
          src={event.imageUrl} 
          alt={event.name} 
          fill 
          className="object-cover brightness-75 hover:brightness-100 transition-all"
        />
      </div>
      
      <div className="p-4 space-y-2 text-gray-200">
        <h3 className="text-xl font-bold text-pink-400">{event.name}</h3>
        
        <div className="flex items-center space-x-2 text-gray-400">
          <Calendar className="w-5 h-5 text-blue-400" />
          <span>{new Date(event.date).toLocaleString()}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-400">
          <MapPin className="w-5 h-5 text-green-400" />
          <span>{event.location}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-400">
          <DollarSign className="w-5 h-5 text-purple-400" />
          <span>{event.ticketPrice} ETH</span>
        </div>
        
        <div className="text-sm text-gray-500">
          Available Tickets: {event.availableTickets}/{event.totalTickets}
        </div>
        <BuyTicket event={event}  />
        
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
        const mockEvents: Event[] = eventMockData
        setEvents(mockEvents);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch events', error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);



  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center 
        text-xl text-pink-400 font-['Orbitron']">
        Loading events...
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-12 px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-pink-400 font-['Orbitron']">
        Upcoming Events
      </h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.filter(event => (
          !event.expired
        )).map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
          />
        ))}
      </div>
    </div>
  );
};

export default EventGrid;
