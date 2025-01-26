"use client"
import React from 'react';
import { 
  Ticket, 
  QrCode, 
  Shield, 
  Zap, 
  Globe, 
  Users 
} from 'lucide-react';
import Link from 'next/link';

const LearnMore: React.FC = () => {
  const features = [
    {
      icon: Ticket,
      title: "Digital Ticketing",
      description: "Secure, blockchain-verified digital tickets that can't be duplicated or forged."
    },
    {
      icon: Shield,
      title: "Fraud Protection",
      description: "Advanced security measures to prevent ticket scalping and unauthorized resales."
    },
    {
      icon: Zap,
      title: "Instant Verification",
      description: "Real-time ticket validation through our decentralized verification system."
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Purchase and manage tickets from anywhere in the world, seamlessly."
    },
    {
      icon: Users,
      title: "Community Marketplace",
      description: "Safe peer-to-peer ticket trading with transparent transaction history."
    },
    {
      icon: QrCode,
      title: "Easy Entry",
      description: "Simple QR code scanning for quick, contactless event entry."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-['Orbitron'] py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-5xl font-bold text-center mb-12 text-pink-400">
          How Our Ticketing Platform Works
        </h1>

        <section className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-800 p-6 rounded-xl border border-pink-500/30 
              hover:border-pink-500 transition-all duration-300 
              hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]"
            >
              <feature.icon className="text-blue-400 w-12 h-12 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-center mb-2 text-cyan-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6 text-pink-400">
            Ready to Get Started?
          </h2>
          <div className="flex justify-center space-x-4">
            <Link href="/sign-in"> 
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition duration-300">
                Create Account
                </button>
            </Link>
            <Link href="/event-listing">
                <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg transition duration-300">
                  Explore Events
                </button>
            </Link>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;