import { User } from './types'; // Importing the types

export const userMockData: User = {
  name: "John Doe",
  email: "john.doe@example.com",
  walletAddress: "0x1234...abcd",
  profilePicture: "/johnDoe.jpg",
  totalTickets: 5,
  joinedDate: "2023-02-15",
  tickets: [
    {
      id: "1",
      eventName: "Summer Music Festival",
      eventDate: "2024-07-15",
      status: 'upcoming',
      ticketImage: "/images/music-festival-ticket.png"
    },
    {
      id: "2",
      eventName: "Tech Conference 2023",
      eventDate: "2023-09-20",
      status: 'expired',
      ticketImage: "/images/tech-conference-ticket.png"
    },
    {
      id: "3",
      eventName: "Art Exhibition",
      eventDate: "2024-05-10",
      status: 'upcoming',
      ticketImage: "/images/art-exhibition-ticket.png"
    }
  ]
};
