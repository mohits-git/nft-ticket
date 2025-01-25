import { Ticket } from "./types";
export const mockTickets: Ticket[] =  [
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