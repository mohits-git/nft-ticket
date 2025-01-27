"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  Users,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import BuyTicket from '@/components/BuyTicket';
import { Event } from '@/utils/types';
import { getEventDetails } from '@/contracts/contract';
import { toast } from 'sonner';

const EventDetailPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const eventId = params.id;
  const [quantity, setQuantity] = useState(1);
  const [event, setEvent] = useState<Event | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  // const event: Event | undefined = eventMockData.find(e => e.id === eventId);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const event: Event | undefined = await getEventDetails(Number(eventId));
        setEvent(event);
      } catch (error) {
        // @ts-expect-error invalid type
        toast.error(error.message);
      }
      setLoading(false);
    })()
  }, [eventId]);

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-['Orbitron']">
        <p className="text-pink-400 text-2xl">Event not found</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center 
        text-xl text-pink-400 font-['Orbitron']">
        Loading events...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-['Orbitron'] py-12 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Event Image */}
        <div className="relative h-[500px] rounded-xl overflow-hidden border-4 border-cyan-500/50">
          <Image
            src={event.imageUrl}
            alt={event.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Event Details */}
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-pink-400 mb-4">{event.name}</h1>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-gray-300">
              <Calendar className="text-cyan-400 w-7 h-7" />
              <span className="text-xl">
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            <div className="flex items-center space-x-4 text-gray-300">
              <MapPin className="text-green-400 w-7 h-7" />
              <span className="text-xl">{event.location}</span>
            </div>

            <div className="flex items-center space-x-4 text-gray-300">
              <DollarSign className="text-blue-400 w-7 h-7" />
              <span className="text-xl">{event.ticketPrice} ETH per ticket</span>
            </div>

            <div className="flex items-center space-x-4 text-gray-300">
              <Users className="text-purple-400 w-7 h-7" />
              <span className="text-xl">
                {Number(event.availableTickets)} / {Number(event.totalTickets)} Tickets Available
              </span>
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed">{event.description}</p>

          {!event.expired ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg"
                >
                  -
                </button>
                <span className="text-xl">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(Number(event.availableTickets), quantity + 1))}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg"
                >
                  +
                </button>
              </div>
              <BuyTicket event={event} eventId={eventId} />
            </div>
          ) : (
            <div className="bg-red-500/20 border border-red-500 p-4 rounded-lg">
              <Clock className="text-red-400 w-7 h-7 mx-auto mb-2" />
              <p className="text-center text-red-300">This event has expired</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
