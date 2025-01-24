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
    console.log('Event Details:', eventDetails);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8 font-['Orbitron']">
      <div className="w-full max-w-2xl bg-gray-900 border-2 border-pink-500 rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.5)] p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-pink-400 tracking-wider">
          Create New Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Name */}
          <div className="flex items-center space-x-3 relative">
            <Tag className="text-pink-500 absolute left-3 z-10" />
            <input
              type="text"
              name="name"
              value={eventDetails.name}
              onChange={handleInputChange}
              placeholder="Event Name"
              required
              className="w-full pl-12 pr-3 py-3 bg-gray-800 text-pink-200 border-2 border-transparent focus:border-pink-500 rounded-lg transition-all duration-300 hover:bg-gray-700"
            />
          </div>

          {/* Date */}
          <div className="flex items-center space-x-3 relative">
            <Calendar className="text-blue-400 absolute left-3 z-10" />
            <input
              type="datetime-local"
              name="date"
              value={eventDetails.date}
              onChange={handleInputChange}
              required
              className="w-full pl-12 pr-3 py-3 bg-gray-800 text-blue-200 border-2 border-transparent focus:border-blue-500 rounded-lg transition-all duration-300 hover:bg-gray-700"
            />
          </div>

          {/* Location */}
          <div className="flex items-center space-x-3 relative">
            <MapPin className="text-green-400 absolute left-3 z-10" />
            <input
              type="text"
              name="location"
              value={eventDetails.location}
              onChange={handleInputChange}
              placeholder="Event Location"
              required
              className="w-full pl-12 pr-3 py-3 bg-gray-800 text-green-200 border-2 border-transparent focus:border-green-500 rounded-lg transition-all duration-300 hover:bg-gray-700"
            />
          </div>

          {/* Ticket Price */}
          <div className="flex items-center space-x-3 relative">
            <DollarSign className="text-purple-400 absolute left-3 z-10" />
            <input
              type="number"
              name="ticketPrice"
              value={eventDetails.ticketPrice}
              onChange={handleInputChange}
              placeholder="Ticket Price (ETH)"
              required
              step="0.01"
              min="0"
              className="w-full pl-12 pr-3 py-3 bg-gray-800 text-purple-200 border-2 border-transparent focus:border-purple-500 rounded-lg transition-all duration-300 hover:bg-gray-700"
            />
          </div>

          {/* Total Tickets */}
          <div className="flex items-center space-x-3 relative">
            <Tag className="text-indigo-400 absolute left-3 z-10" />
            <input
              type="number"
              name="totalTickets"
              value={eventDetails.totalTickets}
              onChange={handleInputChange}
              placeholder="Total Number of Tickets"
              required
              min="1"
              className="w-full pl-12 pr-3 py-3 bg-gray-800 text-indigo-200 border-2 border-transparent focus:border-indigo-500 rounded-lg transition-all duration-300 hover:bg-gray-700"
            />
          </div>

          {/* Description */}
          <textarea
            name="description"
            value={eventDetails.description}
            onChange={handleInputChange}
            placeholder="Event Description"
            required
            className="w-full px-4 py-3 bg-gray-800 text-gray-200 border-2 border-transparent focus:border-blue-500 rounded-lg transition-all duration-300 hover:bg-gray-700"
            rows={4}
          />

          {/* Image Upload */}
          <div className="flex items-center space-x-3 relative">
            <Upload className="text-cyan-400 absolute left-3 z-10" />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full pl-12 file:mr-4 file:rounded-md file:border-0 file:bg-cyan-900/30 file:px-4 file:py-2 file:text-cyan-400 text-cyan-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-4 rounded-lg hover:bg-pink-700 transition-all duration-300 
            shadow-lg shadow-pink-500/50 hover:shadow-pink-500/70 
            transform hover:-translate-y-1 hover:scale-105 
            active:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          >
            Create Event & Mint Tickets
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;