import { User } from './types'; // Importing the types

export const userMockData: User = {
  name: "John Doe",
  email: "john.doe@example.com",
  walletAddress: "0x1234...abcd",
  profilePicture: "/johnDoe.jpg",
  totalTickets: 3,
  joinedDate: "2023-02-15",
  tickets: [
    {
      id: 'TICKET001',
      eventId:'1',
      eventName: "Summer Music Festival",
      eventDate: "2024-07-15",
      status: 'upcoming',
      ticketImage: "/johnDoe.jpg"
    },
    {
      id: 'TICKET002',
      eventId:'2',
      eventName: "Tech Conference 2023",
      eventDate: "2023-09-20",
      status: 'expired',
      ticketImage: "/johnDoe.jpg"
    },
    {
      id: 'TICKET003',
      eventId:'3',
      eventName: "Art Exhibition",
      eventDate: "2024-05-10",
      status: 'upcoming',
      ticketImage: "/johnDoe.jpg"
    }
  ]
};
