import { ShieldCheck } from 'lucide-react'
import React from 'react'
import { Event } from '@/utils/types';
import { buyTicket } from '@/contracts/contract';
import { toast } from 'sonner';

const BuyTicket = ({ event, eventId }: { event: Event, eventId: string }) => {
  const handleBuyTicket = async () => {
    try {
      await buyTicket(eventId, event.ticketPrice);
      toast.success("Ticket purchased successfully")
    } catch (error) {
      // @ts-expect-error invalid type
      toast.error(error.message);
    }
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
