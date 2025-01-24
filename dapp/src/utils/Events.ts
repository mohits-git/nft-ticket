import { Event } from './types'; // Importing the types


export const eventMockData: Event[] = [
    {
      id: '1',
      name: 'Summer Music Festival',
      date: '2024-07-15',
      location: 'City Park, New York',
      ticketPrice: 0.5,
      description: 'Annual summer music celebration',
      imageUrl: 'https://picsum.photos/536/354',
      expired: false,
      totalTickets: 1000,
      availableTickets: 750
    },
    {
      id: '2',
      name: 'Tech Conference 2024',
      date: '2024-09-20',
      location: 'Convention Center, San Francisco',
      ticketPrice: 1.2,
      description: 'Leading technology conference',
      imageUrl: 'https://picsum.photos/536/354',
      expired:true,
      totalTickets: 500,
      availableTickets: 250
    },
    {
        id: '3',
        name: '"Art Exhibition',
        date: '2024-09-20',
        location: 'Convention Center, San Francisco',
        ticketPrice: 1.2,
        description: 'Leading technology conference',
        imageUrl: 'https://picsum.photos/536/354',
        expired:false,
        totalTickets: 500,
        availableTickets: 250
      }
  ];