
import Header from '../../components/Header';
import Footer from '../../components/Footer';
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center p-6">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Secure, Scalable, and Unique Event Ticketing
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Experience the future of event ticketing with NFTicket. Own your tickets as NFTs and enjoy exclusive perks!
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300">
              View Events
            </button>
            <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg hover:bg-yellow-500 transition duration-300">
              Create Event
            </button>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
