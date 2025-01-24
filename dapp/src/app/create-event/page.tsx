"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Upload, Calendar, MapPin, DollarSign, Tag } from 'lucide-react';

// Define the shape of event details
interface EventDetails {
  name: string;
  date: string;
  location: string;
  ticketPrice: string;
  description: string;
  totalTickets: string;
  image: File | null;
}


const EventForm: React.FC = () => {
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    name: '',
    date: '',
    location: '',
    ticketPrice: '',
    description: '',
    totalTickets: '',
    image: null
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setEventDetails(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement ticket minting logic
    console.log('Event Details:', eventDetails);
    // 1. Upload image to IPFS
    // 2. Create event metadata
    // 3. Interact with smart contract to mint NFT tickets
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Event Name */}
        <div className="flex items-center space-x-3">
          <Tag className="text-blue-500" />
          <input
            type="text"
            name="name"
            value={eventDetails.name}
            onChange={handleInputChange}
            placeholder="Event Name"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date */}
        <div className="flex items-center space-x-3">
          <Calendar className="text-blue-500" />
          <input
            type="datetime-local"
            name="date"
            value={eventDetails.date}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div className="flex items-center space-x-3">
          <MapPin className="text-blue-500" />
          <input
            type="text"
            name="location"
            value={eventDetails.location}
            onChange={handleInputChange}
            placeholder="Event Location"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Ticket Price */}
        <div className="flex items-center space-x-3">
          <DollarSign className="text-blue-500" />
          <input
            type="number"
            name="ticketPrice"
            value={eventDetails.ticketPrice}
            onChange={handleInputChange}
            placeholder="Ticket Price (ETH)"
            required
            step="0.01"
            min="0"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Total Tickets */}
        <div className="flex items-center space-x-3">
          <Tag className="text-blue-500" />
          <input
            type="number"
            name="totalTickets"
            value={eventDetails.totalTickets}
            onChange={handleInputChange}
            placeholder="Total Number of Tickets"
            required
            min="1"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          value={eventDetails.description}
          onChange={handleInputChange}
          placeholder="Event Description"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />

        {/* Image Upload */}
        <div className="flex items-center space-x-3">
          <Upload className="text-blue-500" />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Event & Mint Tickets
        </button>
      </form>
    </div>
  );
};

export default EventForm;