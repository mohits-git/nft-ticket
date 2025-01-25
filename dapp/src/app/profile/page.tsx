"use client"
import React, { useState } from "react";
import Image from "next/image";
import {userMockData} from '../../utils/mockUserData'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { 
  User as UserIcon, 
  Mail, 
  Wallet, 
  Calendar, 
  ArrowRight
} from 'lucide-react';
import Link from "next/link";


import { Ticket } from "@/utils/types";
import { User } from "@/utils/types";

interface ProfileProps {
  user?: User;
}


const Profile: React.FC<ProfileProps> = ({ user = userMockData }) => {
  const [activeTicketTab, setActiveTicketTab] = useState<'upcoming' | 'expired'>('upcoming');

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-['Orbitron']">
        <p className="text-pink-400">No user data available.</p>
      </div>
    );
  }

  const { name, email, walletAddress, profilePicture, totalTickets, joinedDate, tickets } = user;

  const filteredTickets = tickets.filter(ticket => ticket.status === activeTicketTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 font-['Orbitron']">
      <div className="w-full max-w-2xl bg-gray-900 border-2 border-pink-500 rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.5)] p-8 text-gray-200">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative w-32 h-32 border-4 border-blue-400 rounded-full">
            <Image
              src={profilePicture || "/images/default-profile.png"}
              alt={`${name}'s profile`}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2 text-pink-400">{name}</h1>
            <div className="flex items-center text-gray-400">
              <Wallet className="mr-2 text-blue-400" />
              <span className="text-sm">{walletAddress}</span>
            </div>
          </div>
          <div className="align-right">

          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          </div>
        </div>

        {/* User Details */}
        <div className="grid grid-cols-3 gap-4 mb-8 text-center">
          <div className="bg-gray-800 p-4 rounded-lg">
            <Mail className="mx-auto mb-2 text-green-400" />
            <span>{email || "Not Provided"}</span>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <UserIcon className="mx-auto mb-2 text-purple-400" />
            <span>Total Tickets: {totalTickets}</span>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Calendar className="mx-auto mb-2 text-cyan-400" />
            <span>Member Since: {new Date(joinedDate).toDateString()}</span>
          </div>
        </div>

        {/* Ticket Sections */}
        <div>
          <div className="flex justify-center mb-6">
            {(['upcoming', 'expired'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTicketTab(tab)}
                className={`px-6 py-2 mx-2 rounded-full uppercase tracking-wider text-sm
                  ${activeTicketTab === tab 
                    ? 'bg-pink-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}
                  transition duration-300`}
              >
                {tab === 'upcoming' ? 'Upcoming Tickets' : 'Past Tickets'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredTickets.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No {activeTicketTab} tickets found
              </div>
            ) : (
              filteredTickets.map((ticket) => (
                <div 
                  key={ticket.id} 
                  className="flex items-center bg-gray-800 rounded-lg p-4 
                  hover:bg-gray-700 transition duration-300"
                >
                  <div className="relative w-24 h-16 mr-4">
                    <Image
                      src={ticket.ticketImage || "/images/default-ticket.png"}
                      alt={`${ticket.eventName} ticket`}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-cyan-300">{ticket.eventName}</h3>
                    <p className="text-gray-400">{new Date(ticket.eventDate).toDateString()}</p>
                  </div>
                  <Link href={`/ticket-details/${ticket.id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg 
                        hover:bg-blue-600 transition duration-300 
                        flex items-center">
                        View Details <ArrowRight className="ml-2" size={18} />
                    </button>
                  </Link>
                  
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <button className="bg-pink-600 text-white py-3 rounded-lg
            hover:bg-pink-700 transition-all duration-300
            shadow-lg shadow-pink-500/50 hover:shadow-pink-500/70
            transform hover:-translate-y-1">
            Edit Profile
          </button>
          <button className="bg-blue-500 text-white py-3 rounded-lg
            hover:bg-blue-600 transition-all duration-300
            shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70
            transform hover:-translate-y-1">
            Wallet Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;