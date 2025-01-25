"use client"
import { useEffect, useState } from 'react';
import { Home, TicketCheck, PlusCircle, Wallet, User } from 'lucide-react';
import Link from 'next/link';
import { connectWallet, hasAccounts } from '@/wallet/connect';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const CyberHeader = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const auth = useAuth();
  const router = useRouter();

  const handleWalletConnect = async () => {
    try {
      if (!auth.isSignedIn) {
        router.push('/sign-in');
        return;
      }
      await connectWallet();
      setIsWalletConnected(true);
    } catch (error) {
      // @ts-expect-error invalid type
      toast.error('Failed to connect wallet' + ' ' + error.message);
    }
  };

  useEffect(() => {
    if (!auth.isSignedIn) return;
    (async () => {
      try {
        const hasA = await hasAccounts();
        setIsWalletConnected(hasA);
      } catch (error) {
        // @ts-expect-error invalid type
        toast.error('Install and connect your metamask' + ' ' + error.message);
      }
    })()
  }, [auth.isSignedIn]);

  return (
    <nav className="bg-black/90 border-b border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.4)] top-0 left-0 right-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.7)] animate-pulse">
                NFTicket
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {[
              { href: '/', icon: Home, label: 'Home' },
              { href: '/event-listing', icon: TicketCheck, label: 'Events' },
              { href: '/create-event', icon: PlusCircle, label: 'Create Event' }
            ].map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="text-cyan-300 hover:text-cyan-100 flex items-center space-x-2 
                           hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.7)] transition-all duration-300"
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Wallet Connection */}
          <div className='flex items-center space-x-4'>
            <button
              onClick={handleWalletConnect}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md
                transition-all duration-300
                ${isWalletConnected
                  ? 'bg-cyan-900/50 text-cyan-300 border border-cyan-500/30'
                  : 'bg-cyan-600/30 text-cyan-200 hover:bg-cyan-600/50 border border-cyan-500/30'}
                hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]
              `}
              disabled={isWalletConnected}
            >
              <Wallet className="h-5 w-5" />
              <span>{isWalletConnected ? 'Connected' : 'Connect Wallet'}</span>
            </button>

            <Link
              href='/profile'
              className="text-cyan-300 hover:text-cyan-100 flex items-center space-x-2
                         hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.7)] transition-all duration-300"
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="bg-cyan-900/30 inline-flex items-center justify-center p-2 rounded-md 
                         text-cyan-300 hover:text-cyan-100 hover:bg-cyan-900/50
                         hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.7)] transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
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

export default CyberHeader;
