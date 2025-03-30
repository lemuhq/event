'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { eventsByCategory, Event } from '@/app/explore/[category]/page';
import CheckoutModal from '@/components/checkout/CheckoutModal';

export default function EventPage() {
  const { id } = useParams();
  const [ticketCount, setTicketCount] = useState(1);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Find the event across all categories
  const event = Object.values(eventsByCategory)
    .flat()
    .find((event: Event) => event.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Event not found</h1>
          <p className="text-neutral-400 mb-8">The event you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/explore"
            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors"
          >
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  const handleGetTickets = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#0A0A0B]/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-white text-xl font-semibold">
            EventWave
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-neutral-400">14:41 GMT+1</span>
            <Link href="/explore" className="text-white hover:text-neutral-200">
              Explore Events →
            </Link>
            <button className="px-4 py-2 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          {/* Featured Badge */}
          {event.featured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800/50">
                <img
                  src={event.featured.logo}
                  alt={event.featured.community}
                  className="w-5 h-5 rounded-full"
                />
                <span className="text-sm text-white">
                  Featured in {event.featured.community} →
                </span>
              </div>
            </motion.div>
          )}

          {/* Event Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="aspect-video w-full rounded-2xl overflow-hidden mb-8"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Event Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white mb-8"
          >
            {event.title}
          </motion.h1>

          {/* Date and Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-4 mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-white/5 rounded-xl flex flex-col items-center justify-center border border-white/10">
                <span className="text-sm text-neutral-400">
                  {event.date.split(' ')[1].toUpperCase().slice(0, 3)}
                </span>
                <span className="text-xl font-semibold text-white">
                  {event.date.split(' ')[0]}
                </span>
              </div>
              <div>
                <div className="text-white font-medium">{event.date}</div>
                <div className="text-sm text-neutral-400">{event.time}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                </svg>
              </div>
              <div>
                <div className="text-white font-medium">{event.location.name}</div>
                <div className="text-sm text-neutral-400">{event.location.address}</div>
              </div>
            </div>
          </motion.div>

          {/* Get Tickets Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-neutral-800/50 rounded-xl p-6 mb-12"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Get Tickets</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-white">Ticket Price</span>
              <span className="text-2xl font-bold text-white">
                {event.price.amount === 0 ? 'Free' : `${event.price.currency}${(event.price.amount * ticketCount).toFixed(2)}`}
              </span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-neutral-400">Quantity</span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                  className="w-8 h-8 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 12H4"/>
                  </svg>
                </button>
                <span className="text-white font-medium w-8 text-center">{ticketCount}</span>
                <button 
                  onClick={() => setTicketCount(ticketCount + 1)}
                  className="w-8 h-8 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="text-sm text-neutral-400 mb-6">
              {ticketCount === 1 ? 'Per ticket' : `${ticketCount} tickets total`}
            </div>
            <button 
              onClick={handleGetTickets}
              className="w-full py-3 rounded-lg bg-[#FF5400] text-white font-medium hover:bg-[#FF5400]/90 transition-colors"
            >
              {event.price.amount === 0 
                ? `Register ${ticketCount === 1 ? 'Now' : `${ticketCount} Spots`}` 
                : `Get ${ticketCount === 1 ? 'Ticket' : `${ticketCount} Tickets`}`
              }
            </button>
          </motion.div>

          {/* About Event */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-xl font-semibold text-white mb-4">About Event</h2>
            <div className="prose prose-invert">
              <p className="text-neutral-400">{event.description}</p>
            </div>
          </motion.div>

          {/* Disclaimer */}
          {event.disclaimer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-12 text-sm text-neutral-500"
            >
              <h3 className="font-medium mb-2">Disclaimer:</h3>
              <p>{event.disclaimer}</p>
            </motion.div>
          )}

          {/* Organizer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="pt-6 border-t border-neutral-800"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Hosted By</h2>
            <div className="flex items-start justify-between">
              <Link 
                href={`/hosts/${event.organizer.id}`}
                className="flex items-center gap-4 group"
              >
                <img 
                  src={event.organizer.avatar} 
                  alt={event.organizer.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-white font-medium group-hover:text-neutral-200 transition-colors">
                    {event.organizer.name}
                  </h3>
                  <p className="text-sm text-neutral-400">{event.organizer.description}</p>
                </div>
              </Link>
              <button className="px-4 py-2 rounded-lg bg-white/5 text-white text-sm hover:bg-white/10">
                Subscribe
              </button>
            </div>
          </motion.div>

          {/* Footer Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex flex-col gap-2 text-sm text-neutral-500"
          >
            <button className="text-left hover:text-neutral-400">Contact the Host</button>
            <button className="text-left hover:text-neutral-400">Refund Policy</button>
            <button className="text-left hover:text-neutral-400">Report Event</button>
          </motion.div>
        </div>
      </main>

      {/* Checkout Modal */}
      {event && (
        <CheckoutModal 
          isOpen={isCheckoutOpen} 
          onClose={() => setIsCheckoutOpen(false)} 
          event={event} 
          ticketCount={ticketCount} 
        />
      )}
    </div>
  );
} 