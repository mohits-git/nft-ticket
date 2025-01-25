"use client"
import { useState } from 'react';
import { 
  TicketCheck, 
  ShieldCheck, 
  Globe, 
  Rocket, 
  Lock,
  ArrowRight,
  Target,
  Zap
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [activeTab, setActiveTab] = useState('about');

  const features = [
    {
      icon: TicketCheck,
      title: "Digital NFT Tickets",
      description: "Blockchain-verified event tickets that provide true ownership, authenticity, and unique digital provenance.",
      details: [
        "Cryptographically secured digital assets",
        "Permanent ownership record",
        "Transferable across global platforms"
      ]
    },
    {
      icon: ShieldCheck,
      title: "Secure Verification",
      description: "Advanced fraud prevention with cutting-edge blockchain authentication mechanisms.",
      details: [
        "Real-time ticket validation",
        "Immutable transaction history",
        "Smart contract security protocols"
      ]
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Seamless international ticket marketplace enabling global event participation and trading.",
      details: [
        "Cross-border ticket transactions",
        "Multi-currency support",
        "Instant international transfers"
      ]
    },
    {
      icon: Target,
      title: "Collector's Value",
      description: "Transform event tickets into valuable digital collectibles with potential appreciation.",
      details: [
        "Limited edition NFT designs",
        "Potential investment opportunities",
        "Historical event memorabilia"
      ]
    }
  ];

  const technologicalHighlights = [
    { icon: Rocket, title: "Blockchain Infrastructure", description: "Ethereum-based smart contract ecosystem" },
    { icon: Lock, title: "Advanced Encryption", description: "Military-grade security protocols" },
    { icon: Zap, title: "Instant Transactions", description: "Sub-second ticket verification" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-black text-white font-['Orbitron']">
      {/* Hero Section with Dynamic Background */}
      <section className="relative flex-grow flex items-center justify-center p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/30 to-cyan-900/30 animate-pulse"></div>
        <div className="relative z-10 text-center max-w-3xl min-h-[80vh] mx-auto pt-[10%]">
          <h1 className="text-5xl md:text-6xl font-bold text-pink-400 mb-6 tracking-wider 
            drop-shadow-[0_0_20px_rgba(236,72,153,0.6)]">
            Redefining Event Experiences
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 
            drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]">
            NFTicket transforms event participation into a blockchain-powered, collector-driven journey. 
            More than just entry — we're creating digital memorials of shared experiences.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/event-listing" className="bg-pink-600 text-white px-8 py-4 rounded-xl
              hover:bg-pink-700 transition duration-300
              shadow-2xl shadow-pink-500/50 hover:shadow-pink-500/70
              transform hover:-translate-y-2 hover:scale-110">
              Explore Events
            </Link>
            <Link href="/create-event" className="bg-cyan-500 text-white px-8 py-4 rounded-xl
              hover:bg-cyan-600 transition duration-300
              shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70
              transform hover:-translate-y-2 hover:scale-110">
              Launch Event
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section with Expanded Details */}
      <section className="bg-gray-900/60 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-800/50 rounded-2xl overflow-hidden 
              border border-cyan-500/30 hover:border-cyan-400 
              transition duration-500 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]"
            >
              <div className="flex items-center bg-gray-900/70 p-6">
                <feature.icon className="h-16 w-16 text-cyan-400 mr-6" />
                <h3 className="text-3xl font-bold text-cyan-300">{feature.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-lg text-gray-300 mb-4">{feature.description}</p>
                <ul className="space-y-2 text-gray-400">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="mr-2 text-cyan-400">▸</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About & Technology Tabs */}
      <section className="bg-transparent py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-12">
            {['about', 'technology'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 mx-2 rounded-full uppercase tracking-wider text-sm font-semibold
                  ${activeTab === tab 
                    ? 'bg-pink-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}
                  transition duration-300`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="text-center text-gray-300">
            {activeTab === 'about' ? (
              <div>
                <h2 className="text-4xl font-bold mb-6 text-cyan-400 
                  drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                  About NFTicket
                </h2>
                <p className="max-w-4xl mx-auto text-xl mb-8 leading-relaxed">
                  NFTicket is pioneering a paradigm shift in event experiences by transforming 
                  traditional ticketing into a dynamic, blockchain-powered ecosystem. 
                  We're not just selling tickets; we're creating digital artifacts that 
                  capture the essence of memorable moments.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {technologicalHighlights.map((tech, index) => (
                  <div key={index} className="bg-gray-800/50 p-8 rounded-xl 
                    hover:bg-gray-700/50 transition duration-300">
                    <tech.icon className="mx-auto h-20 w-20 text-cyan-400 mb-6" />
                    <h3 className="text-2xl font-bold text-cyan-300 mb-4">{tech.title}</h3>
                    <p className="text-gray-300">{tech.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-pink-900/30 to-cyan-900/30 py-20 px-6">
        <div className="text-center max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold mb-8 text-cyan-300 
            drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
            Join the Digital Event Revolution
          </h2>
          <p className="text-2xl text-gray-200 mb-12">
            Whether you're an innovative event creator or a passionate attendee, 
            NFTicket offers an unprecedented digital experience that transcends traditional boundaries.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/sign-in" className="bg-pink-600 text-white px-10 py-4 rounded-xl 
              flex items-center gap-3
              hover:bg-pink-700 transition duration-300
              transform hover:-translate-y-2 hover:scale-110
              shadow-2xl shadow-pink-500/50">
              Get Started <ArrowRight className="inline" />
            </Link>
            <Link href="/learn-more" className="bg-cyan-500/30 text-cyan-300 px-10 py-4 rounded-xl
              hover:bg-cyan-500/50 transition duration-300
              transform hover:-translate-y-2 hover:scale-110
              shadow-2xl shadow-cyan-500/30">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}