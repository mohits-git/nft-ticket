"use client"
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  QrCode, 
  UserCheck, 
  ArrowLeft 
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { mockTickets } from '@/utils/mockTicketData';
import { eventMockData } from '@/utils/mockEventsData';
import { Ticket, Event } from '@/utils/types';

const TicketDetails: React.FC = () => {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams<{id: string}>();

  useEffect(() => {
    const fetchTicketDetails = () => {
      // Simulate API fetch with mock data
      const foundTicket = mockTickets.find(t => t.id === params.id);
      const foundEvent = foundTicket 
        ? eventMockData.find(e => e.id === foundTicket.eventId) 
        : null;

      setTicket(foundTicket || null);
      setEvent(foundEvent || null);
      setIsLoading(false);
    };

    fetchTicketDetails();
  }, [params.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const handleGoBack = () => {
    window.history.back();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center 
        text-xl text-pink-400 font-['Orbitron']">
        Loading ticket details...
      </div>
    );
  }

  if (!ticket || !event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center 
        text-xl text-pink-400 font-['Orbitron']">
        Ticket not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black 
      flex items-center justify-center p-4 font-['Orbitron']">
      <div className="w-full max-w-2xl bg-gray-900 border-2 border-pink-500 
        rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.5)] p-8 text-gray-200">
        {/* Back Navigation */}
        <button 
          onClick={handleGoBack} 
          className="mb-6 flex items-center text-gray-400 
          hover:text-pink-400 transition duration-300"
        >
          <ArrowLeft className="mr-2" />
          Back to Profile
        </button>

        {/* Ticket Image */}
        <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
          <img
            src={ticket.ticketImage || event.imageUrl}
            alt={`${event.name} ticket`}
            className="w-full h-full object-cover brightness-75"
          />
        </div>

        {/* Event Details */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-pink-400 mb-2">{event.name}</h1>
          <div className="space-y-3">
            <div className="flex items-center">
              <Calendar className="mr-3 text-blue-400" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-3 text-green-400" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-3 text-yellow-400" />
              <span>Status: {ticket.status === 'upcoming' ? 'Active' : 'Expired'}</span>
            </div>
          </div>
        </div>

        {/* Ticket Information */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <QrCode className="mr-3 text-cyan-400" />
              <span>Ticket ID: {ticket.id}</span>
            </div>
            <span className="text-xl font-bold text-green-400">
              ${event.ticketPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center">
            <UserCheck className="mr-3 text-purple-400" />
            <span>Transfer Status: Non-Transferable</span>
          </div>
        </div>

        {/* Event Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">Event Description</h2>
          <p className="text-gray-400">{event.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            disabled={ticket.status !== 'upcoming'}
            className={`py-3 rounded-lg transition duration-300 
              ${ticket.status === 'upcoming' 
                ? 'bg-pink-600 text-white hover:bg-pink-700' 
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
          >
            {ticket.status === 'upcoming' ? 'Upcoming' : 'expired'}
          </button>
          <button 
            className="bg-blue-500 text-white py-3 rounded-lg 
              hover:bg-blue-600 transition duration-300"
          >
            Download Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;