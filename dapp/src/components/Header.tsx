"use client"
import  { useState } from 'react';
import { Home, TicketCheck, PlusCircle, Wallet } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleWalletConnect = () => {
    // TODO: Implement wallet connection logic
    setIsWalletConnected(true);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">NFTicket</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" 
              className="text-gray-600 hover:text-blue-600 flex items-center space-x-2">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link href='/event-listing'
              className="text-gray-600 hover:text-blue-600 flex items-center space-x-2"
            >
              <TicketCheck className="h-5 w-5" />
              <span>Events</span>
            </Link>
            <Link href='/create-event'
              className="text-gray-600 hover:text-blue-600 flex items-center space-x-2"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Create Event</span>
              </Link>
          </div>

          {/* Wallet Connection */}
          <div>
            <button 
              onClick={handleWalletConnect}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md 
                ${isWalletConnected 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'}
              `}
            >
              <Wallet className="h-5 w-5" />
              <span>
                {isWalletConnected ? 'Connected' : 'Connect Wallet'}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button 
              type="button" 
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg 
                className="h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </nav>
  );
};

export default Header;