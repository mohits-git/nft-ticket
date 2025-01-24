export type Ticket = {
    id: string;
    eventName: string;
    eventDate: string;
    status: 'upcoming' | 'expired' | 'used';
    ticketImage: string;
  };
  
  export type User = {
    name: string;
    email: string;
    walletAddress: string;
    profilePicture: string;
    totalTickets: number;
    joinedDate: string;
    tickets: Ticket[];
  };
  export type Event = {
    id: string,
    name: string,
    date: string,
    location: string,
    ticketPrice: number,
    description: string,
    imageUrl: string,
    expired: boolean,
    totalTickets: number,
    availableTickets: number
  }
  