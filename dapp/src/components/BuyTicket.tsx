import { ShieldCheck } from 'lucide-react'
import React from 'react'
import { Event } from '@/utils/types';
const BuyTicket = ({event}:{event:Event}) => {
    
  const handleBuyTicket = () => {
    console.log(`Buying ${event.availableTickets} ticket(s) for event ${event.id}`);
    // TODO: Implement actual ticket purchase logic
  };
  return (
    <div>
      <button
                onClick={handleBuyTicket}
                disabled={event.availableTickets === 0}
                className="w-full bg-pink-600 text-white py-3 rounded-lg 
                  hover:bg-pink-700 transition-colors 
                  disabled:opacity-50 flex items-center justify-center"
              >
                <ShieldCheck className="mr-2" />
                {event.availableTickets > 0 ? 'Buy Ticket' : 'Sold Out'}
              </button>
    </div>
  )
}

export default BuyTicket
